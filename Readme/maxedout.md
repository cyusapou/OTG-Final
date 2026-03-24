# ON THE GO - COMPLETE FRONTEND CODEBASE DOCUMENTATION
## EXTREMELY DETAILED TECHNICAL SPECIFICATION FOR MOCKUP DEVELOPMENT

---

## 🏗️ **PROJECT OVERVIEW & ARCHITECTURE**

### **Application Identity**
- **Name**: On The Go (On Rwanda - Bus Booking)
- **Platform**: Rwanda Bus Transportation System
- **Type**: Progressive Web Application (PWA)
- **Framework**: Vue 3.5.24 with Composition API
- **Build Tool**: Vite 7.2.4
- **CSS Framework**: Tailwind CSS 3.4.1 with custom configuration
- **State Management**: Custom reactive store (no Vuex/Pinia)
- **Routing**: Vue Router 5.0.3 with role-based guards
- **Maps**: Leaflet 1.9.4 with Vue-Leaflet integration
- **Geospatial**: @turf/turf 7.3.4 for location calculations

### **Project Structure**
```
c:\Final\
├── index.html (Main HTML entry point)
├── package.json (Dependencies and scripts)
├── tailwind.config.js (Tailwind configuration)
├── vite.config.js (Vite build configuration)
├── postcss.config.js (PostCSS configuration)
├── src/
│   ├── App.vue (Root component with dark mode)
│   ├── main.js (Application entry point and routing)
│   ├── style.css (Global styles and CSS variables)
│   ├── store/
│   │   └── index.js (Central state management)
│   ├── components/ (Reusable UI components)
│   ├── pages/ (Route-based page components)
│   ├── layouts/ (Layout components)
│   ├── composables/ (Vue composables)
│   ├── services/ (API and external services)
│   ├── assets/ (Static assets)
│   ├── data/ (Static data files)
│   └── translations/ (Internationalization)
├── public/ (Public assets)
├── backend/ (Backend API endpoints)
└── server/ (Server configuration)
```

---

## 🎨 **DESIGN SYSTEM & COLOR PALETTE**

### **Primary Color Scheme - Green Theme**
```css
/* Primary Green Scale */
--primary-green: #2E7D32;        /* Main brand color */
--primary-green-light: #4CAF50;  /* Interactive elements */
--primary-green-dark: #1B5E20;   /* Dark mode variant */
--primary-green-bg: #E8F5E9;     /* Background accents */

/* Tailwind Configuration */
primary: {
  50: '#E8F5E9',  /* Lightest background */
  100: '#C8E6C9', /* Very light */
  200: '#A5D6A7', /* Light */
  300: '#81C784', /* Medium light */
  400: '#66BB6A', /* Medium */
  500: '#4CAF50', /* Standard (primary) */
  600: '#43A047', /* Medium dark */
  700: '#388E3C', /* Dark */
  800: '#2E7D32', /* Very dark (main) */
  900: '#1B5E20', /* Darkest */
}
```

### **Accent Colors**
```css
/* Accent Blue */
accent: {
  500: '#1976D2',  /* Primary accent */
  600: '#1565C0',  /* Dark accent */
}

/* Neutral Grayscale */
neutral: {
  50: '#F9FAFB',   /* Lightest background */
  100: '#F3F4F6',  /* Very light background */
  200: '#E5E7EB',  /* Light background */
  300: '#D1D5DB',  /* Light border */
  400: '#9CA3AF',  /* Medium border */
  500: '#6B7280',  /* Medium text */
  600: '#4B5563',  /* Dark text */
  700: '#374151',  /* Very dark text */
  800: '#1F2937',  /* Darkest text */
  900: '#1F2937',  /* Maximum dark */
}
```

### **Dark Mode Implementation**
```css
/* Dark Mode CSS Variables */
:root.dark {
  --bg-primary: #121212;    /* Main background */
  --bg-secondary: #1E1E1E;  /* Card backgrounds */
  --bg-tertiary: #2C2C2C;   /* Hover states */
  --text-primary: #E8E8E8;  /* Main text */
  --text-secondary: #B0B0B0; /* Secondary text */
  --text-tertiary: #808080;  /* Muted text */
  --border-color: #2C2C2C;   /* Borders */
}
```

### **Typography System**
```css
/* Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font Loading */
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

/* Font Weights */
400: Regular (body text)
500: Medium (subheadings)
600: Semibold (headings)
700: Bold (emphasis)

/* Icon System */
Font Awesome 6.4.0 - Complete icon set
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
```

### **Spacing System**
```css
/* Custom Tailwind Spacing */
'sidebar-width': '220px',     /* Desktop sidebar width */
'sidebar-collapsed': '60px',   /* Collapsed sidebar width */

/* Standard Tailwind Spacing */
4px (1), 8px (2), 12px (3), 16px (4), 20px (5), 24px (6),
32px (8), 40px (10), 48px (12), 56px (14), 64px (16)
```

### **Shadow System**
```css
/* Custom Box Shadows */
'nav': '0 -1px 4px rgba(0, 0, 0, 0.05)',        /* Navigation */
'card': '0 2px 8px rgba(0, 0, 0, 0.1)',        /* Cards */
'dark-nav': '0 -1px 4px rgba(0, 0, 0, 0.3)',    /* Dark navigation */
'dark-card': '0 2px 8px rgba(0, 0, 0, 0.3)',    /* Dark cards */
```

### **Animation System**
```css
/* Custom Transitions */
transitionDuration: {
  '300': '300ms',  /* Standard transition */
}

/* Keyframe Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Utility Classes */
.fade-in { animation: fadeIn 0.3s ease-in; }
.slide-down { animation: slideDown 0.3s ease-in; }
```

---

## 📱 **RESPONSIVE DESIGN BREAKPOINTS**

### **Mobile-First Approach**
```css
/* Mobile (< 500px) - Base Styles */
- Bottom navigation bar
- Full-width content
- Touch-optimized interactions
- 16px padding on content
- 70px bottom padding for nav

/* Desktop (>= 500px) */
- Fixed sidebar navigation (220px wide)
- Content area: calc(100% - 220px)
- 24px content padding
- Hover states and desktop interactions

/* Large Desktop (>= 1200px) */
- Maximum content width for readability
- Enhanced spacing and typography
```

### **Viewport Meta Configuration**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

---

## 🧭 **NAVIGATION SYSTEM**

### **Mobile Bottom Navigation (< 500px)**
```vue
<!-- Navigation Items -->
1. Home (/) - fas fa-home
2. Express (/express) - fas fa-bus  
3. Track (/track) - fas fa-map-marker-alt
4. Account (/account or /login) - fas fa-user / fas fa-sign-in-alt

<!-- Styling -->
- Fixed position bottom: 0
- Height: 70px
- Background: white/dark neutral-900
- Border-top: 1px solid gray-200/dark neutral-700
- Active state: primary-500 background
- Icons: 20px, Text: 12px
```

### **Desktop Sidebar (>= 500px)**
```vue
<!-- Sidebar Structure -->
- Logo Section: "On The Go" with bus icon
- Toggle button for collapse (60px when collapsed)
- Navigation sections with titles
- User authentication state
- Dark mode toggle

<!-- Dimensions -->
- Width: 220px (expanded), 60px (collapsed)
- Fixed position left: 0
- Full height: 100vh
- Background: white/dark neutral-900
- Border-right: 1px solid gray-200/dark neutral-700
```

---

## 🏪 **STATE MANAGEMENT ARCHITECTURE**

### **Central Store Structure**
```javascript
export const store = reactive({
  // Selected Data (Booking Flow)
  selectedExpress: null,
  selectedTrip: null,
  selectedDestination: null,
  selectedOriginStop: null,
  selectedDestinationStop: null,
  autoResolvedOrigin: false,
  selectedDate: new Date().toISOString().split('T')[0],
  
  // UI State
  currentLang: 'en',
  darkMode: true, // Computed property with getter/setter
  showTicket: false,
  isProcessing: false,
  stopCode: '',
  
  // Authentication
  user: null,
  token: null,
  userRole: null, // Driver, Manager, Admin, SuperAdmin
  
  // Desktop Sidebar
  sidebarOpen: true,
  
  // Location Services
  userLocation: {
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
    address: null
  },
  locationFetched: false,
  showLocationModal: false,
  selectedStopForTracking: null,
  
  // Bus Tracking
  isTrackingBus: false,
  busLocation: {
    latitude: null,
    longitude: null,
    lastUpdated: null
  },
  nearestStation: null,
  trackingIntervalId: null,
  
  // Routine Trips (Saved travel plans)
  routineTrips: [
    {
      id: 1,
      name: 'School',
      originStop: { id: 1, name: 'Nyabugogo Main Station', type: 'station', city: 'Kigali' },
      destinationStop: { id: 211, name: 'Butare Terminal', type: 'station', city: 'Butare' },
      preferredCompanyId: 1,
      usualDepartureTime: '07:30',
      daysOfWeek: [1, 2, 3, 4, 5], // Mon-Fri
      defaultPaymentMethod: 'mobileMoney'
    }
  ],
  
  // Planned Trips (Future trips)
  plannedTrips: [],
})
```

### **Bus Stops Data Structure**
```javascript
export const stops = [
  // Kigali Stations
  { id: 1, name: 'Nyabugogo Main Station', type: 'station', city: 'Kigali', hasCode: false, code: null },
  { id: 2, name: 'Remera Sonatubes', type: 'station', city: 'Kigali', hasCode: false, code: null },
  
  // Kigali Roadside Stops with 4-digit codes
  { id: 101, name: 'Bus Stop 1234', type: 'roadside', city: 'Kigali', hasCode: true, code: '1234', area: 'Kicukiro' },
  
  // Other Cities
  { id: 201, name: 'Musanze Main Station', type: 'station', city: 'Musanze', hasCode: false, code: null },
  // ... more stops
]
```

---

## 🛣️ **ROUTING SYSTEM**

### **Route Structure with Role-Based Access**
```javascript
const routes = [
  // Customer Routes (Public)
  { path: '/', component: LandingPage },
  { path: '/login', component: AuthGatePage },
  { path: '/express', component: ExpressPage },
  { path: '/trips', component: TripsPage },
  { path: '/destination', component: DestinationPage },
  { path: '/summary', component: SummaryPage },
  { path: '/payment', component: PaymentPage },
  { path: '/routine', component: RoutineTripsPage },
  { path: '/planner', component: PlannerPage },
  { path: '/track', component: TrackPage },
  { path: '/account', component: AccountPage },
  
  // Driver Routes (Protected)
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
  
  // Manager Routes (Protected)
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
  
  // Admin Routes (Protected)
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
  
  // RURA Super Admin Routes (Protected)
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
]
```

### **Route Guards**
```javascript
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
```

---

## 🎯 **PAGE COMPONENTS DETAILED SPECIFICATIONS**

### **1. LandingPage.vue (/)**
```vue
<!-- Purpose: Main landing and booking entry point -->
<!-- Features: -->
- Hero section with app branding
- Quick booking form (origin, destination, date)
- Featured routes/promotions
- Recent bookings section
- Location-based nearest stop finder
- Dark mode toggle
- Mobile-responsive design

<!-- Key Elements: -->
- Search inputs with autocomplete
- Date picker
- "Search Buses" CTA button
- Route cards with pricing
- User location detection
- Bottom navigation integration
```

### **2. ExpressPage.vue (/express)**
```vue
<!-- Purpose: Express bus company selection -->
<!-- Features: -->
- Grid/list of express companies
- Company logos and branding
- Ratings and reviews
- Route availability indicators
- Filter by route type
- Search functionality

<!-- Key Elements: -->
- Company cards with logos
- Star ratings
- Available routes count
- Price range indicators
- Filter options
- Search bar
```

### **3. TripsPage.vue (/trips)**
```vue
<!-- Purpose: Trip/time selection for chosen express -->
<!-- Features: -->
- Time-based trip listings
- Seat availability indicators
- Price display
- Trip duration
- Bus type indicators
- Real-time availability
- Sorting options

<!-- Key Elements: -->
- Trip cards with time slots
- Seat count indicators
- Price badges
- Duration display
- Bus type icons
- Sort/filter controls
```

### **4. DestinationPage.vue (/destination)**
```vue
<!-- Purpose: Specific stop/destination selection -->
<!-- Features: -->
- Interactive map integration
- Stop search with codes
- Popular destinations
- Recent selections
- GPS-based nearest stops
- Stop details and amenities

<!-- Key Elements: -->
- Leaflet map component
- Search input with autocomplete
- Stop code input
- Destination cards
- Location markers
- Distance indicators
```

### **5. SummaryPage.vue (/summary)**
```vue
<!-- Purpose: Booking summary and confirmation -->
<!-- Features: -->
- Complete trip details
- Passenger information form
- Seat selection
- Price breakdown
- Terms and conditions
- Proceed to payment

<!-- Key Elements: -->
- Trip summary card
- Passenger form fields
- Seat selection grid
- Price calculation
- Terms checkbox
- "Proceed to Payment" CTA
```

### **6. PaymentPage.vue (/payment)**
```vue
<!-- Purpose: Payment processing -->
<!-- Features: -->
- Multiple payment methods
- Mobile money integration
- Card payment forms
- Wallet balance
- Payment processing states
- Receipt generation

<!-- Key Elements: -->
- Payment method selector
- Mobile money form
- Card input fields
- Amount display
- Processing spinner
- Success/error states
```

### **7. TrackPage.vue (/track)**
```vue
<!-- Purpose: Real-time bus tracking -->
<!-- Features: -->
- Live map with bus position
- Route visualization
- ETA calculations
- Stop notifications
- Trip progress
- Location sharing

<!-- Key Elements: -->
- Interactive map
- Bus marker
- Route polyline
- Stop markers
- ETA display
- Progress bar
- Refresh controls
```

### **8. AccountPage.vue (/account)**
```vue
<!-- Purpose: User account management -->
<!-- Features: -->
- Profile information
- Booking history
- Saved payment methods
- Routine trips management
- Settings and preferences
- Logout functionality

<!-- Key Elements: -->
- Profile form
- Booking list
- Payment cards
- Routine trip cards
- Settings toggles
- Logout button
```

---

## 🧩 **REUSABLE COMPONENTS**

### **BottomNav.vue**
```vue
<!-- Purpose: Mobile bottom navigation -->
<!-- Features: -->
- 4 main navigation items
- Active state indicators
- Authentication-aware display
- Smooth transitions
- Icon + text labels

<!-- Styling: -->
- Fixed bottom positioning
- 70px height
- Primary color active states
- Flex layout with equal spacing
- Touch-friendly tap targets
```

### **LocationTracker.vue**
```vue
<!-- Purpose: GPS location services -->
<!-- Features: -->
- Location permission handling
- GPS coordinate tracking
- Address geocoding
- Nearest stop calculation
- Location sharing
- Error handling

<!-- Integration: -->
- Leaflet maps
- Geolocation API
- Store integration
- Stop database
- Distance calculations
```

### **DarkModeToggle.vue**
```vue
<!-- Purpose: Dark mode switching -->
<!-- Features: -->
- Toggle switch animation
- System preference detection
- LocalStorage persistence
- Smooth theme transitions
- Icon state changes

<!-- Styling: -->
- Toggle switch component
- Sun/moon icons
- Smooth transitions
- Accessible labels
- Hover states
```

### **LanguageToggle.vue**
```vue
<!-- Purpose: Multi-language support -->
<!-- Features: -->
- Language selection dropdown
- Translation persistence
- RTL language support
- Flag icons
- Language detection

<!-- Languages: -->
- English (en)
- Kinyarwanda (rw)
- French (fr)
- Swahili (sw)
```

---

## 🗺️ **MAP & LOCATION SYSTEM**

### **Leaflet Integration**
```javascript
// Dependencies
"leaflet": "^1.9.4"
"@vue-leaflet/vue-leaflet": "^0.10.1"
"@turf/turf": "^7.3.4"

// Map Configuration
- Tile Layer: OpenStreetMap
- Center: Kigali, Rwanda (-1.9403, 30.0444)
- Zoom: Default 13, Min 10, Max 18
- Controls: Zoom, Attribution

// Features
- Custom bus markers
- Stop location markers
- Route polylines
- Real-time position updates
- Interactive popups
- Clustering for multiple markers
```

### **Location Services**
```javascript
// GPS Tracking
- WatchPosition API for real-time tracking
- Accuracy filtering (minimum 50m)
- Timeout handling (30 seconds)
- Error handling for denied permissions
- Battery optimization considerations

// Geocoding
- Reverse geocoding for addresses
- Forward geocoding for coordinates
- Stop code lookup system
- Distance calculations using Turf.js
- Nearest stop algorithms
```

---

## 🎨 **UI COMPONENT PATTERNS**

### **Card Components**
```css
/* Standard Card Pattern */
.card {
  @apply bg-white dark:bg-neutral-800 rounded-lg shadow-card dark:shadow-dark-card p-4 border border-gray-200 dark:border-neutral-700;
}

/* Interactive Card */
.card-interactive {
  @apply card hover:shadow-lg transition-shadow duration-300 cursor-pointer;
}

/* Status Cards */
.card-success { @apply border-l-4 border-green-500; }
.card-warning { @apply border-l-4 border-yellow-500; }
.card-error { @apply border-l-4 border-red-500; }
.card-info { @apply border-l-4 border-blue-500; }
```

### **Button Patterns**
```css
/* Primary Button */
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200;
}

/* Secondary Button */
.btn-secondary {
  @apply bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-800 dark:text-neutral-200 font-medium py-3 px-6 rounded-lg transition-colors duration-200;
}

/* Outline Button */
.btn-outline {
  @apply border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200;
}

/* Ghost Button */
.btn-ghost {
  @apply text-primary-500 hover:bg-primary-50 dark:hover:bg-neutral-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200;
}
```

### **Form Elements**
```css
/* Input Fields */
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-100 placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200;
}

/* Select Dropdowns */
.form-select {
  @apply form-input appearance-none cursor-pointer;
}

/* Textareas */
.form-textarea {
  @apply form-input resize-none min-h-[100px];
}

/* Checkboxes & Radio */
.form-checkbox {
  @apply w-4 h-4 text-primary-500 border-gray-300 dark:border-neutral-600 rounded focus:ring-primary-500 focus:ring-2;
}

.form-radio {
  @apply w-4 h-4 text-primary-500 border-gray-300 dark:border-neutral-600 focus:ring-primary-500 focus:ring-2;
}
```

---

## 📊 **DATA FLOW & PATTERNS**

### **Booking Flow State Management**
```javascript
// Step 1: Landing Page → Express Selection
store.selectedOriginStop = originStop
store.selectedDestinationStop = destinationStop
store.selectedDate = date

// Step 2: Express Page → Trip Selection  
store.selectedExpress = expressCompany

// Step 3: Trips Page → Destination Selection
store.selectedTrip = selectedTrip

// Step 4: Destination Page → Summary
store.selectedDestination = finalDestination

// Step 5: Summary → Payment
// Payment processing...

// Step 6: Payment Complete
store.showTicket = true
// Reset flow after completion
```

### **Authentication Flow**
```javascript
// Login Process
1. User enters credentials → AuthGatePage
2. API validation → token + user data
3. Store update → store.token, store.user, store.userRole
4. LocalStorage persistence
5. Route guard validation
6. Redirect to appropriate dashboard

// Role-Based Routing
Driver → /driver dashboard
Manager → /manager dashboard  
Admin → /admin dashboard
SuperAdmin → /rura dashboard
```

---

## 🌙 **DARK MODE IMPLEMENTATION**

### **System Architecture**
```javascript
// Dark Mode State
const isDarkMode = computed(() => store.isDarkMode)

// Initialization
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    store.isDarkMode = savedDarkMode === 'true'
  }
  updateDarkModeClass()
})

// Reactive Updates
watch(isDarkMode, () => {
  updateDarkModeClass()
  localStorage.setItem('darkMode', isDarkMode.value.toString())
})

// DOM Class Management
const updateDarkModeClass = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
```

### **Tailwind Dark Mode Classes**
```css
/* Component-Specific Dark Mode */
.dark-bg-primary { @apply dark:bg-neutral-900; }
.dark-bg-secondary { @apply dark:bg-neutral-800; }
.dark-bg-tertiary { @apply dark:bg-neutral-700; }
.dark-text-primary { @apply dark:text-neutral-100; }
.dark-text-secondary { @apply dark:text-neutral-300; }
.dark-text-tertiary { @apply dark:text-neutral-400; }
.dark-border { @apply dark:border-neutral-700; }
```

---

## 📱 **MOBILE OPTIMIZATIONS**

### **Touch Interactions**
```css
/* Touch-Friendly Targets */
.touch-target {
  @apply min-h-[44px] min-w-[44px]; /* iOS HIG minimum */
}

/* Touch Feedback */
.touch-feedback {
  @apply active:scale-95 transition-transform duration-100;
}

/* Swipe Gestures */
.swipe-container {
  touch-action: pan-y; /* Allow vertical scrolling only */
}
```

### **Mobile-Specific Features**
```javascript
// Viewport Configuration
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

// PWA Features (Future)
- Service Worker for offline functionality
- App Manifest for installation
- Push notifications for trip updates
- Geofencing for stop notifications

// Mobile Performance
- Lazy loading for route components
- Image optimization
- Bundle size optimization
- Critical CSS inlining
```

---

## 🎯 **COMPONENT LIBRARY SPECIFICATIONS**

### **Loading States**
```vue
<!-- Loading Spinner Component -->
<LoadingSpinner size="sm|md|lg" color="primary|secondary" />

<!-- Skeleton Loading -->
<SkeletonLoader type="text|card|list" :lines="3" />

<!-- Progress Bar -->
<ProgressBar :percentage="75" show-label color="primary" />
```

### **Notification System**
```vue
<!-- Toast Notifications -->
<Toast 
  :message="notification.text" 
  :type="notification.type" 
  :duration="5000"
  position="top-right"
/>

<!-- Modal System -->
<Modal 
  v-model="showModal" 
  :size="'sm'|'md'|'lg'|'xl'"
  :closable="true"
  title="Modal Title"
>
  <!-- Modal content -->
</Modal>

<!-- Alert Components -->
<Alert type="success|warning|error|info" :dismissible="true">
  Alert message content
</Alert>
```

### **Data Display Components**
```vue
<!-- Badge Component -->
<Badge :text="'New'" :type="'primary'|'secondary'|'success'" :size="'sm'|'md'" />

<!-- Avatar Component -->
<Avatar 
  :src="user.avatar" 
  :name="user.name" 
  :size="'sm'|'md'|'lg'"
  :online="true"
/>

<!-- Status Indicator -->
<StatusIndicator :status="'online'|'offline'|'busy'" :label="'Available'" />
```

---

## 🔧 **TECHNICAL IMPLEMENTATION DETAILS**

### **Build Configuration**
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          maps: ['leaflet', '@vue-leaflet/vue-leaflet', '@turf/turf']
        }
      }
    }
  }
})
```

### **PostCSS Configuration**
```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### **Package Dependencies**
```json
{
  "dependencies": {
    "@turf/turf": "^7.3.4",           // Geospatial calculations
    "@vue-leaflet/vue-leaflet": "^0.10.1", // Vue Leaflet integration
    "leaflet": "^1.9.4",              // Interactive maps
    "vue": "^3.5.24",                 // Vue 3 framework
    "vue-router": "^5.0.3"            // Client-side routing
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1",  // Vue plugin for Vite
    "autoprefixer": "^10.4.17",       // CSS autoprefixer
    "postcss": "^8.4.32",             // CSS processing
    "tailwindcss": "^3.4.1",          // Utility-first CSS
    "vite": "^7.2.4"                  // Build tool
  }
}
```

---

## 🚀 **PERFORMANCE OPTIMIZATIONS**

### **Code Splitting**
```javascript
// Lazy-loaded admin routes
const DriverDashboard = () => import('./pages/driver/DriverDashboard.vue')
const ManagerDashboard = () => import('./pages/manager/ManagerDashboard.vue')
const AdminDashboard = () => import('./pages/admin/AdminDashboard.vue')
const RuraDashboard = () => import('./pages/rura/RuraDashboard.vue')
```

### **Asset Optimization**
```javascript
// Image optimization
- WebP format support
- Responsive images with srcset
- Lazy loading for below-fold images
- SVG icons for UI elements

// Bundle optimization
- Tree shaking for unused code
- Minification of CSS/JS
- Gzip compression
- CDN for external libraries
```

---

## 📋 **ACCESSIBILITY FEATURES**

### **WCAG 2.1 Compliance**
```html
<!-- Semantic HTML5 -->
<nav>, <main>, <section>, <article>, <header>, <footer>

<!-- ARIA Labels -->
<button aria-label="Toggle dark mode">
<div role="tabpanel" aria-labelledby="tab-1">

<!-- Keyboard Navigation -->
tabindex="0" for focusable elements
:disabled for disabled states

<!-- Screen Reader Support -->
sr-only class for screen-reader-only text
aria-live="polite" for dynamic content
aria-describedby for form field descriptions
```

### **Focus Management**
```css
/* Focus Styles */
.focus-visible:focus {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2;
}

/* Skip Links */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded;
}
```

---

## 🔐 **SECURITY CONSIDERATIONS**

### **Authentication Security**
```javascript
// JWT Token Management
- Token storage in localStorage (XSS risk consideration)
- Automatic token refresh
- Role-based access control
- Route guards for protected pages

// Input Validation
- Form sanitization
- XSS prevention
- CSRF protection
- SQL injection prevention (backend)
```

### **Data Privacy**
```javascript
// Location Data
- User consent for GPS tracking
- Minimal data collection
- Secure data transmission
- Data retention policies

// Payment Information
- PCI compliance considerations
- Tokenization of payment methods
- Secure payment gateway integration
- No card data storage
```

---

## 🎯 **USER EXPERIENCE PATTERNS**

### **Micro-interactions**
```css
/* Hover States */
.hover-lift:hover { @apply transform -translate-y-1 shadow-lg; }

/* Loading States */
.loading-skeleton { @apply animate-pulse bg-gray-200 dark:bg-neutral-700; }

/* Success Feedback */
.success-animation { @apply animate-bounce; }
```

### **Error Handling**
```vue
<!-- Error Boundary Component -->
<ErrorBoundary @error="handleError">
  <slot />
</ErrorBoundary>

<!-- Error States -->
<ErrorState 
  :title="'Something went wrong'" 
  :message="'Please try again later'" 
  :action="'Retry'" 
  @retry="retryOperation"
/>
```

---

## 📊 **ANALYTICS & MONITORING**

### **User Tracking**
```javascript
// Event Tracking
- Page views
- Booking funnel events
- User interactions
- Feature usage
- Performance metrics

// Custom Events
- 'booking_started'
- 'payment_completed'
- 'location_access_granted'
- 'route_searched'
- 'app_installed'
```

---

## 🔄 **INTERNATIONALIZATION (i18n)**

### **Translation System**
```javascript
// Language Support
const translations = {
  en: {
    home: 'Home',
    express: 'Express',
    track: 'Track',
    account: 'Account',
    signIn: 'Sign In'
  },
  rw: {
    home: 'Ahabanza',
    express: 'Express',
    track: 'Kurikira',
    account: 'Akonti',
    signIn: 'Injira'
  }
  // ... more languages
}

// Usage in Components
const { t } = useTranslation()
{{ t.home }}
```

---

## 🎨 **BRANDING GUIDELINES**

### **Logo Usage**
```css
/* Primary Logo */
- "On The Go" text with bus icon
- Primary green (#4CAF50) color
- Inter font family
- Minimum size: 24px height
- Clear space: 0.5x logo height

/* Favicon */
- Bus icon in green
- 32x32px minimum
- Transparent background
```

### **Voice & Tone**
```css
/* Brand Personality */
- Friendly and approachable
- Efficient and reliable
- Modern and clean
- Trustworthy and secure

/* Copy Guidelines */
- Simple, clear language
- Action-oriented CTAs
- Consistent terminology
- Localized for Rwandan context
```

---

## 🚀 **DEPLOYMENT & INFRASTRUCTURE**

### **Build Process**
```bash
# Development
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build

# Build Output
- dist/ directory
- Static asset optimization
- Hashed filenames for caching
- Source maps for debugging
```

### **Environment Configuration**
```javascript
// Environment Variables
VITE_API_URL=https://api.ongo.rw
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_SENTRY_DSN=your_sentry_dsn
```

---

## 📋 **TESTING STRATEGY**

### **Component Testing**
```javascript
// Vue Test Utils
- Unit tests for components
- User interaction testing
- Props validation
- Event emission testing

// E2E Testing
- Critical user flows
- Cross-browser testing
- Mobile device testing
- Performance testing
```

---

## 🎯 **FUTURE ROADMAP**

### **Phase 2 Features**
```javascript
// Advanced Features
- Push notifications
- Offline mode support
- PWA installation
- Advanced analytics
- AI-powered recommendations
- Social features
- Loyalty program integration
```

### **Technical Enhancements**
```javascript
// Performance
- Service worker implementation
- Advanced caching strategies
- Image optimization
- Bundle size reduction

// UX Improvements
- Gesture support
- Voice search
- Advanced filters
- Personalization
- Accessibility enhancements
```

---

## 📞 **SUPPORT & CONTACT**

### **Development Team**
- Frontend Lead: Vue.js Specialist
- Backend Lead: Node.js Developer  
- UI/UX Designer: Figma Expert
- DevOps: Cloud Infrastructure

### **Project Management**
- Version Control: Git
- Issue Tracking: GitHub Issues
- Documentation: This file
- Code Review: Pull Requests

---

## 🎯 **CONCLUSION**

This comprehensive documentation provides every detail needed to understand, develop, and extend the "On The Go" Rwanda bus booking application. The system is built with modern web technologies, follows best practices for performance and accessibility, and provides an excellent user experience across all devices.

The architecture supports scalability, maintainability, and future enhancements while maintaining a consistent design language and user experience throughout the application.

---

*Last Updated: March 2026*
*Version: 1.0.0*
*Framework: Vue 3.5.24 with Composition API*
