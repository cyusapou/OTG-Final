import { createApp } from 'vue'
import './style.css'
import 'leaflet/dist/leaflet.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { store } from './store/index.js'

// Layouts
import AdminLayout from './layouts/AdminLayout.vue'

// Customer Pages
import AuthGatePage from './pages/AuthGatePage.vue'
import LandingPage from './pages/LandingPage.vue'
import ExpressPage from './pages/ExpressPage.vue'
import TripsPage from './pages/TripsPage.vue'
import DestinationPage from './pages/DestinationPage.vue'
import SummaryPage from './pages/SummaryPage.vue'
import PaymentPage from './pages/PaymentPage.vue'
import RoutineTripsPage from './pages/RoutineTripsPage.vue'
import PlannerPage from './pages/PlannerPage.vue'
import TrackPage from './pages/TrackPage.vue'
import AccountPage from './pages/AccountPage.vue'

// Utility Pages
import UnauthorizedPage from './pages/UnauthorizedPage.vue'
import TestAuthPage from './pages/TestAuthPage.vue'

// Admin Pages (lazy-loaded)
// Driver pages
const DriverDashboard = () => import('./pages/driver/DriverDashboard.vue')
const DriverTrip = () => import('./pages/driver/DriverTrip.vue')
const DriverHistory = () => import('./pages/driver/DriverHistory.vue')
const DriverProfile = () => import('./pages/driver/DriverProfile.vue')

// Manager pages
const ManagerDashboard = () => import('./pages/manager/ManagerDashboard.vue')
const ManagerDrivers = () => import('./pages/manager/ManagerDrivers.vue')
const ManagerTrips = () => import('./pages/manager/ManagerTrips.vue')
const ManagerSchedule = () => import('./pages/manager/ManagerSchedule.vue')
const ManagerReports = () => import('./pages/manager/ManagerReports.vue')

// Express Admin pages
const AdminDashboard = () => import('./pages/express-admin/AdminDashboard.vue')
const AdminManagers = () => import('./pages/express-admin/AdminManagers.vue')
const AdminFleet = () => import('./pages/express-admin/AdminFleet.vue')
const AdminFinance = () => import('./pages/express-admin/AdminFinance.vue')
const AdminRoutes = () => import('./pages/express-admin/AdminRoutes.vue')
const AdminComplaints = () => import('./pages/express-admin/AdminComplaints.vue')

// RURA pages
const RuraDashboard = () => import('./pages/rura/RuraDashboard.vue')
const RuraExpresses = () => import('./pages/rura/RuraExpresses.vue')
const RuraCompliance = () => import('./pages/rura/RuraCompliance.vue')
const RuraFeedback = () => import('./pages/rura/RuraFeedback.vue')
const RuraAnalytics = () => import('./pages/rura/RuraAnalytics.vue')
const RuraAnnouncements = () => import('./pages/rura/RuraAnnouncements.vue')
const RuraUsers = () => import('./pages/rura/RuraUsers.vue')

// Initialize user from localStorage
const initializeStore = () => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const userRole = localStorage.getItem('userRole')
    
    if (token && user) {
      store.token = token
      store.user = JSON.parse(user)
      store.userRole = userRole
    }
  } catch (err) {
    console.error('Error loading user from localStorage:', err)
  }
}

initializeStore()

const routes = [
  // --- CUSTOMER ROUTES ---
  { path: '/', component: LandingPage },
  { path: '/login', component: AuthGatePage },
  { path: '/auth', component: AuthGatePage },
  { path: '/test-login', component: TestAuthPage },
  { path: '/home', component: LandingPage },
  { path: '/express', component: ExpressPage },
  { path: '/trips', component: TripsPage },
  { path: '/destination', component: DestinationPage },
  { path: '/summary', component: SummaryPage },
  { path: '/payment', component: PaymentPage },
  { path: '/routine', component: RoutineTripsPage },
  { path: '/planner', component: PlannerPage },
  { path: '/track', component: TrackPage },
  { path: '/account', component: AccountPage },

  // --- DRIVER ROUTES ---
  {
    path: '/driver',
    component: AdminLayout,
    meta: { requiredRole: 'Driver' },
    children: [
      { path: '', component: DriverDashboard },
      { path: 'trip', component: DriverTrip },
      { path: 'history', component: DriverHistory },
      { path: 'profile', component: DriverProfile },
    ],
  },

  // --- MANAGER ROUTES ---
  {
    path: '/manager',
    component: AdminLayout,
    meta: { requiredRole: 'Manager' },
    children: [
      { path: '', component: ManagerDashboard },
      { path: 'drivers', component: ManagerDrivers },
      { path: 'trips', component: ManagerTrips },
      { path: 'schedule', component: ManagerSchedule },
      { path: 'reports', component: ManagerReports },
    ],
  },

  // --- EXPRESS ADMIN ROUTES ---
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiredRole: 'Admin' },
    children: [
      { path: '', component: AdminDashboard },
      { path: 'managers', component: AdminManagers },
      { path: 'fleet', component: AdminFleet },
      { path: 'finance', component: AdminFinance },
      { path: 'routes', component: AdminRoutes },
      { path: 'complaints', component: AdminComplaints },
    ],
  },

  // --- RURA (SUPERIOR ADMIN) ROUTES ---
  {
    path: '/rura',
    component: AdminLayout,
    meta: { requiredRole: 'SuperAdmin' },
    children: [
      { path: '', component: RuraDashboard },
      { path: 'expresses', component: RuraExpresses },
      { path: 'compliance', component: RuraCompliance },
      { path: 'feedback', component: RuraFeedback },
      { path: 'analytics', component: RuraAnalytics },
      { path: 'announcements', component: RuraAnnouncements },
      { path: 'users', component: RuraUsers },
    ],
  },

  // Error pages
  { path: '/unauthorized', component: UnauthorizedPage },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Role guard - runs before every navigation
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')

  if (to.meta.requiredRole) {
    if (!token) {
      return next('/login')
    }
    if (to.meta.requiredRole !== userRole) {
      return next('/unauthorized')
    }
  }

  next()
})

createApp(App).use(router).mount('#app')
