 <template>
  <div class="track-page">
    <div class="container">
      <!-- Mobile: Language toggle -->
      <div class="mobile-lang-toggle">
        <LanguageToggle />
      </div>

      <!-- Page Header -->
      <div class="page-header">
        <button class="btn-back" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1>{{ t.track }}</h1>
      </div>

      <!-- Map Section -->
      <section class="map-section card">
        <BusMapFeature ref="busMapRef" />
      </section>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store/index.js'
import { translations } from '../translations/index.js'
import LanguageToggle from '../components/LanguageToggle.vue'
import BusMapFeature from '../components/BusMapFeature.vue'

const router = useRouter()
const currentLang = computed(() => store.currentLang)
const t = computed(() => translations[currentLang.value])

// Component refs
const busMapRef = ref(null)

const goBack = () => {
  router.back()
}

// Expose methods for external access if needed
defineExpose({
  busMapRef,
  findNearestStation: () => busMapRef.value?.handleFindNearestStation(),
  centerOnUser: () => busMapRef.value?.centerOnUser(),
  resetView: () => busMapRef.value?.resetView()
})
</script>


<style scoped>
.track-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #E8F5E9 0%, var(--bg-primary) 60%);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px 20px;
}

/* Mobile: Language toggle */
.mobile-lang-toggle {
  display: none;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 499px) {
  .mobile-lang-toggle {
    display: block;
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 100;
    padding: 0;
    border: none;
  }
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  margin-bottom: 16px;
}

.btn-back {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-back:active {
  transform: scale(0.95);
}

.page-header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  flex: 1;
}

/* Card Section */
.card {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
}

/* Map Section */
.map-section {
  min-height: 400px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 18px;
  }
  
  .map-section {
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 12px 16px;
  }
  
  .page-header {
    padding: 12px 0;
    margin-bottom: 12px;
  }
  
  .btn-back {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  
  .page-header h1 {
    font-size: 16px;
  }
  
  .map-section {
    min-height: 300px;
  }
}

/* Desktop: max width constraint */
@media (min-width: 500px) {
  .mobile-lang-toggle {
    display: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .track-page {
    background: linear-gradient(180deg, #1B5E20 0%, var(--bg-primary) 60%);
  }
}
</style>
