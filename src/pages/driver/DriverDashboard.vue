<template>
  <div class="driver-dashboard bg-white dark:bg-neutral-950 transition-colors">
    <div class="page-header">
      <h2><i class="fas fa-car"></i> Good morning, {{ driverName }}</h2>
      <p class="subtitle">Here's your activity for today</p>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <StatsCard icon="fas fa-bus" label="Today's Trips" :value="String(todayTrips.length)" :trend="todayTrips.length ? 'Assigned' : 'None'" />
      <StatsCard icon="fas fa-star" label="Rating" value="—" trend="—" />
      <StatsCard icon="fas fa-coins" label="Earnings Today" value="—" trend="—" />
      <StatsCard icon="fas fa-map-marker-alt" label="Distance" value="—" trend="—" />
    </div>

    <!-- Status Toggle -->
    <div class="card status-card">
      <h3>Your Status</h3>
      <div class="status-buttons">
        <button
          v-for="s in ['Online', 'On Break', 'Offline']"
          :key="s"
          :class="['status-btn', { active: driverStatus === s }]"
          @click="setStatus(s)"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <!-- Loading trips -->
    <div class="card" v-if="loadingTrips">
      <p><i class="fas fa-spinner fa-spin"></i> Loading your trips…</p>
    </div>

    <!-- Today's Trip(s) -->
    <template v-else-if="todayTrips.length">
      <div class="card trip-card" v-for="(trip, idx) in todayTrips" :key="trip.id">
        <div class="trip-header">
          <h3><i class="fas fa-rocket"></i> {{ todayTrips.length > 1 ? `Trip ${idx + 1}` : 'Current Trip' }}</h3>
          <span class="status-badge">Scheduled</span>
        </div>
        <div class="trip-info">
          <p><strong>Route:</strong> {{ trip.routeName }}</p>
          <p><strong>Departure:</strong> {{ trip.departureTime }}</p>
          <p><strong>Bus:</strong> {{ trip.busPlate || '—' }}</p>
        </div>
        <button
          class="trip-action-btn"
          :class="tripActive === trip.id ? 'btn-end' : 'btn-start'"
          @click="toggleTrip(trip.id)"
        >
          <i :class="tripActive === trip.id ? 'fas fa-stop-circle' : 'fas fa-rocket'"></i> {{ tripActive === trip.id ? 'End Trip' : 'Start Trip' }}
        </button>
      </div>
    </template>

    <div class="card" v-else>
      <p>No trip assigned for today.</p>
    </div>

    <!-- Recent Trips Summary -->
    <div class="card">
      <h3><i class="fas fa-clipboard-list"></i> Last 5 Trips Summary</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Route</th>
            <th>Passengers</th>
            <th>Rating</th>
            <th>Earnings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Today</td>
            <td>Kigali → Muhanga</td>
            <td>45</td>
            <td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>
            <td>KES 800</td>
          </tr>
          <tr>
            <td>Yesterday</td>
            <td>Muhanga → Kigali</td>
            <td>48</td>
            <td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>
            <td>KES 850</td>
          </tr>
          <tr>
            <td>2 days ago</td>
            <td>Kigali → Butare</td>
            <td>50</td>
            <td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>
            <td>KES 1,200</td>
          </tr>
          <tr>
            <td>3 days ago</td>
            <td>Butare → Kigali</td>
            <td>42</td>
            <td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>
            <td>KES 900</td>
          </tr>
          <tr>
            <td>4 days ago</td>
            <td>Kigali → Musanze</td>
            <td>46</td>
            <td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>
            <td>KES 950</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StatsCard from '../../components/admin/StatsCard.vue'
import { driverService } from '../../services/driverService.js'
import { scheduleService } from '../../services/scheduleService.js'
import { routeService } from '../../services/routeService.js'

const router = useRouter()
const driverStatus = ref('Online')
const tripActive = ref(null)
const driver = ref({})
const todayTrips = ref([])
const loadingTrips = ref(true)

const driverName = computed(() => {
  const d = driver.value
  if (d.firstName && d.lastName) return `${d.firstName} ${d.lastName}`
  return d.name || 'Driver'
})

function setStatus(status) {
  driverStatus.value = status
}

function toggleTrip(tripId) {
  tripActive.value = tripActive.value === tripId ? null : tripId
}

function formatTime(timeStr) {
  if (!timeStr) return '—'
  if (timeStr.includes('T')) {
    return new Date(timeStr).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }
  return timeStr
}

async function loadTrips() {
  loadingTrips.value = true
  todayTrips.value = []
  try {
    const ids = driver.value.assignedScheduleIds || []
    const today = new Date().toISOString().split('T')[0]
    for (const id of ids) {
      try {
        const schedule = await scheduleService.getDetailed(id)
        if (schedule.date !== today) continue
        const route = await routeService.getById(schedule.routeId).catch(() => null)
        const routeName = route
          ? `${route.origin || route.name || ''} → ${route.destination || ''}`.trim() || schedule.routeId
          : schedule.routeId
        todayTrips.value.push({
          id: schedule.id,
          routeName,
          departureTime: formatTime(schedule.departureTime),
          busPlate: schedule.busPlate || '—',
        })
      } catch { /* skip */ }
    }
  } catch {
    todayTrips.value = []
  } finally {
    loadingTrips.value = false
  }
}

onMounted(async () => {
  const raw = localStorage.getItem('driverSession')
  if (!raw) {
    router.replace('/driver/login')
    return
  }
  driver.value = JSON.parse(raw)
  if (driver.value.id) {
    try {
      const fresh = await driverService.getById(driver.value.id)
      if (fresh && Array.isArray(fresh.assignedScheduleIds)) {
        driver.value.assignedScheduleIds = fresh.assignedScheduleIds
        localStorage.setItem('driverSession', JSON.stringify(driver.value))
      }
    } catch { /* keep existing session */ }
  }
  loadTrips()
})
</script>

<style scoped>
.driver-dashboard {
  display: grid;
  gap: 24px;
}

.page-header {
  margin-bottom: 12px;
}

.page-header h2 {
  margin: 0 0 8px 0;
  font-size: 28px;
  color: #1a202c;
}

.subtitle {
  margin: 0;
  color: #5a6c7d;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 12px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e8ecf1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.card h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
}

.trip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.trip-header h3 {
  margin: 0;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.status-buttons {
  display: flex;
  gap: 12px;
}

.status-btn {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e8ecf1;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.status-btn.active {
  background: #2E7D32;
  color: white;
  border-color: #2E7D32;
}

.status-btn:hover {
  border-color: #2E7D32;
}

.trip-info {
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f6fa;
  border-radius: 8px;
}

.trip-info p {
  margin: 8px 0;
  font-size: 14px;
  color: #1a202c;
}

.trip-action-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.trip-action-btn.btn-start {
  background: #2E7D32;
  color: white;
}

.trip-action-btn.btn-start:hover {
  background: #1B5E20;
}

.trip-action-btn.btn-end {
  background: #ef4444;
  color: white;
}

.trip-action-btn.btn-end:hover {
  background: #dc2626;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th {
  background: #f5f6fa;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #424242;
  border-bottom: 1px solid #e8ecf1;
  font-size: 12px;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.data-table tbody tr:hover {
  background: #fafafa;
}
</style>
