<template>
  <div class="page-wrapper">
    <!-- Mobile: Language toggle -->
    <div class="mobile-lang-toggle">
      <LanguageToggle />
    </div>

    <div class="track-page">
      <!-- Page Header -->
      <div class="page-header">
        <h1>{{ t.track }}</h1>
        <p class="page-subtitle">{{ t.trackYourJourney }}</p>
      </div>

      <!-- Tabs -->
      <div class="track-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'details' }]" 
          @click="activeTab = 'details'"
        >
          <i class="fas fa-info-circle"></i>
          <span>{{ t.details }}</span>
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'map' }]" 
          @click="activeTab = 'map'"
        >
          <i class="fas fa-map"></i>
          <span>{{ t.map }}</span>
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'picker' }]" 
          @click="activeTab = 'picker'"
        >
          <i class="fas fa-location-dot"></i>
          <span>{{ t.chooseLocation }}</span>
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'journey' }]" 
          @click="activeTab = 'journey'"
        >
          <i class="fas fa-route"></i>
          <span>{{ t.journey }}</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tabs-content">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ t.fetchingLocation || 'Fetching your location...' }}</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error && activeTab === 'details'" class="error-state">
          <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <p class="error-message">{{ error }}</p>
          <button class="retry-btn" @click="handleGetLocation">
            <i class="fas fa-redo"></i> {{ t.retry || 'Retry' }}
          </button>
        </div>

        <!-- Details Tab -->
        <div v-else-if="activeTab === 'details'" class="tab-content details-content">
          <div v-if="userLocation && userLocation.latitude" class="location-display">
            <div class="location-success">
              <div class="success-icon">
                <i class="fas fa-map-pin"></i>
              </div>
              <p class="success-text">{{ t.locationFound || 'Location Found!' }}</p>
            </div>

            <!-- Location Details -->
            <div class="location-details">
              <div class="detail-item">
                <label>{{ t.address || 'Address' }}</label>
                <p class="detail-value">{{ userLocation.address || 'Rwanda' }}</p>
              </div>

              <div class="detail-item">
                <label>{{ t.coordinates || 'Coordinates' }}</label>
                <p class="detail-value coordinates">
                  <span class="lat">{{ userLocation.latitude.toFixed(4) }}</span>
                  <span class="separator">,</span>
                  <span class="lng">{{ userLocation.longitude.toFixed(4) }}</span>
                </p>
              </div>

              <div class="detail-item">
                <label>{{ t.accuracy || 'Accuracy' }}</label>
                <p class="detail-value">±{{ Math.round(userLocation.accuracy) }}m</p>
              </div>

              <div class="detail-item">
                <label>{{ t.time || 'Time' }}</label>
                <p class="detail-value">{{ formatTime(userLocation.timestamp) }}</p>
              </div>
            </div>

            <!-- Refresh Button -->
            <button class="refresh-btn" @click="handleGetLocation">
              <i class="fas fa-sync-alt"></i> {{ t.refresh || 'Refresh' }}
            </button>
          </div>
          <div v-else class="no-location">
            <i class="fas fa-map-marker-alt"></i>
            <p>{{ t.getLocationData || 'No location data yet' }}</p>
            <button class="primary-btn" @click="handleGetLocation">
              <i class="fas fa-location-arrow"></i> {{ t.getMyLocation || 'Get My Location' }}
            </button>
          </div>
        </div>

        <!-- Map Tab -->
        <div v-else-if="activeTab === 'map'" class="tab-content map-content">
          <LocationMap v-if="userLocation && userLocation.latitude" :location="userLocation" />
          <div v-else class="empty-state">
            <i class="fas fa-map"></i>
            <p>{{ t.getLocationFirst || 'Get your location first to view map' }}</p>
            <button class="primary-btn" @click="activeTab = 'details'; handleGetLocation()">
              <i class="fas fa-location-arrow"></i> {{ t.getMyLocation || 'Get My Location' }}
            </button>
          </div>
        </div>

        <!-- Location Picker Tab -->
        <div v-else-if="activeTab === 'picker'" class="tab-content picker-content">
          <LocationPicker @location-selected="handleLocationSelected" />
        </div>

        <!-- Journey Tracker Tab -->
        <div v-else-if="activeTab === 'journey'" class="tab-content journey-content">
          <JourneyTracker />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { store } from '../store/index.js'
import { translations } from '../translations/index.js'
import LanguageToggle from '../components/LanguageToggle.vue'
import LocationMap from '../components/LocationMap.vue'
import LocationPicker from '../components/LocationPicker.vue'
import JourneyTracker from '../components/JourneyTracker.vue'

const currentLang = computed(() => store.currentLang)
const t = computed(() => translations[currentLang.value])
const userLocation = computed(() => store.userLocation)

const activeTab = ref('details')
const isLoading = ref(false)
const error = ref('')

const handleGetLocation = () => {
  isLoading.value = true
  error.value = ''

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        store.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
          address: 'Kigali, Rwanda' // You can integrate reverse geocoding here
        }
        store.locationFetched = true
        isLoading.value = false
      },
      (err) => {
        console.error(err)
        error.value = err.message || t.value.locationError || 'Unable to fetch location'
        isLoading.value = false
      }
    )
  } else {
    error.value = t.value.geolocationNotSupported || 'Geolocation is not supported by your browser'
    isLoading.value = false
  }
}

const handleLocationSelected = (location) => {
  store.userLocation = location
  activeTab.value = 'journey'
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString(currentLang.value === 'en' ? 'en-US' : 'fr-FR')
}

onMounted(() => {
  // Auto-fetch location on component mount
  if (!store.locationFetched) {
    handleGetLocation()
  }
})
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
}

.mobile-lang-toggle {
  display: none;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 499px) {
  .mobile-lang-toggle {
    display: block;
  }
}

.track-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

/* Tabs */
.track-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
  padding-bottom: 0;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.02);
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.tab-btn i {
  font-size: 16px;
}

@media (max-width: 499px) {
  .tab-btn span {
    display: none;
  }

  .track-tabs {
    gap: 0;
    padding-bottom: 12px;
  }

  .tab-btn {
    flex: 1;
    justify-content: center;
    border-bottom-width: 3px;
  }
}

/* Tab Content */
.tabs-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: auto;
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Details Content */
.details-content {
  gap: 16px;
}

.location-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.location-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 12px;
  color: white;
  text-align: center;
}

.success-icon {
  font-size: 40px;
}

.success-text {
  font-size: 16px;
  font-weight: 600;
}

.location-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 499px) {
  .location-details {
    grid-template-columns: 1fr;
  }
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.detail-item label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  word-break: break-word;
}

.coordinates {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
}

.refresh-btn {
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.refresh-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.no-location,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-secondary);
}

.no-location i,
.empty-state i {
  font-size: 48px;
  color: var(--text-secondary);
  opacity: 0.5;
}

.primary-btn {
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Loading and Error States */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
}

.error-icon {
  font-size: 48px;
  color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
}

.retry-btn {
  padding: 10px 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Map Content */
.map-content {
  min-height: 400px;
}

/* Picker Content */
.picker-content {
  min-height: 400px;
}

/* Journey Content */
.journey-content {
  min-height: 400px;
}

/* Dark Mode */
:global(.dark-mode) .location-success {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

:global(.dark-mode) .detail-item {
  background: var(--bg-secondary);
}
</style>
