<template>
  <div>
    <!-- Mobile Bottom Nav -->
    <nav class="bottom-nav mobile-nav">
      <div :class="['nav-item', { active: isActive('/') }]" @click="goTo('/')">
        <i class="fas fa-home"></i>
        <span>{{ t.home }}</span>
      </div>
      <div :class="['nav-item', { active: isActive('/express') }]" @click="goTo('/express')">
        <i class="fas fa-bus"></i>
        <span>{{ t.express }}</span>
      </div>
      <div :class="['nav-item', { active: isActive('/track') }]" @click="goTo('/track')">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ t.track }}</span>
      </div>
      <div :class="['nav-item', { active: moreRoutes.some(r => isActive(r)) }]" @click="toggleMore">
        <i class="fas fa-ellipsis-h"></i>
        <span>{{ t.more || 'More' }}</span>
      </div>
    </nav>

    <!-- More Menu Overlay -->
    <Teleport to="body">
      <Transition name="more-fade">
        <div v-if="showMore" class="more-overlay" @click.self="showMore = false">
          <div class="more-sheet">
            <div class="more-handle" />
            <div class="more-items">
              <div class="more-item" @click="goToMore('/routine')">
                <div class="more-icon"><i class="fas fa-bookmark"></i></div>
                <div class="more-text">
                  <span class="more-label">{{ t.routineTrips }}</span>
                  <span class="more-desc">Your saved daily trips</span>
                </div>
                <i class="fas fa-chevron-right more-arrow"></i>
              </div>
              <div class="more-item" @click="goToMore('/planner')">
                <div class="more-icon"><i class="fas fa-calendar-alt"></i></div>
                <div class="more-text">
                  <span class="more-label">{{ t.planner }}</span>
                  <span class="more-desc">Plan a future trip</span>
                </div>
                <i class="fas fa-chevron-right more-arrow"></i>
              </div>
              <div class="more-item" @click="goToMore('/bookings')">
                <div class="more-icon"><i class="fas fa-ticket-alt"></i></div>
                <div class="more-text">
                  <span class="more-label">{{ t.recentBookings || 'My Bookings' }}</span>
                  <span class="more-desc">View your booking history</span>
                </div>
                <i class="fas fa-chevron-right more-arrow"></i>
              </div>
              <div class="more-divider" />
              <div class="more-item" @click="handleAccountMore">
                <div class="more-icon"><i :class="isAuthenticated ? 'fas fa-user' : 'fas fa-sign-in-alt'"></i></div>
                <div class="more-text">
                  <span class="more-label">{{ isAuthenticated ? t.account : (t.signIn || 'Sign In') }}</span>
                  <span class="more-desc">{{ isAuthenticated ? 'Manage your profile' : 'Sign in to your account' }}</span>
                </div>
                <i class="fas fa-chevron-right more-arrow"></i>
              </div>
              <div class="more-divider" />
              <div class="more-footer">
                <div class="more-controls">
                  <LanguageToggle />
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Desktop Sidebar -->
    <aside class="sidebar desktop-nav" :class="{ collapsed: !sidebarOpen }">
      <div class="sidebar-header">
        <div class="sidebar-logo" v-if="sidebarOpen">
          <div class="logo-icon"><i class="fas fa-bus"></i></div>
          <div class="logo-text">
            <h1>On The Go</h1>
            <span>Kigali, Rwanda</span>
          </div>
        </div>
        <button class="sidebar-toggle" @click="toggleSidebar">
          <i :class="sidebarOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"></i>
        </button>
      </div>

      <div class="sidebar-content">
        <div class="nav-section">
          <div class="nav-section-title" v-if="sidebarOpen">{{ t.main }}</div>
          <div :class="['sidebar-item', { active: isActive('/') }]" @click="goTo('/')">
            <i class="fas fa-home"></i>
            <span v-if="sidebarOpen">{{ t.home }}</span>
          </div>
          <div :class="['sidebar-item', { active: isActive('/express') }]" @click="goTo('/express')">
            <i class="fas fa-bus"></i>
            <span v-if="sidebarOpen">{{ t.express }}</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-section-title" v-if="sidebarOpen">{{ t.myPlans }}</div>
          <div :class="['sidebar-item', { active: isActive('/routine') }]" @click="goTo('/routine')">
            <i class="fas fa-bookmark"></i>
            <span v-if="sidebarOpen">{{ t.routineTrips }}</span>
          </div>
          <div :class="['sidebar-item', { active: isActive('/planner') }]" @click="goTo('/planner')">
            <i class="fas fa-calendar-alt"></i>
            <span v-if="sidebarOpen">{{ t.planner }}</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-section-title" v-if="sidebarOpen">{{ t.other }}</div>
          <div :class="['sidebar-item', { active: isActive('/track') }]" @click="goTo('/track')">
            <i class="fas fa-map-marker-alt"></i>
            <span v-if="sidebarOpen">{{ t.track }}</span>
          </div>
          <div :class="['sidebar-item', { active: isActive('/bookings') }]" @click="goTo('/bookings')">
            <i class="fas fa-ticket-alt"></i>
            <span v-if="sidebarOpen">{{ t.recentBookings || 'My Bookings' }}</span>
          </div>
          <div :class="['sidebar-item', { active: isActive('/account') || isActive('/login') }]" @click="handleAccountClick">
            <i :class="isAuthenticated ? 'fas fa-user' : 'fas fa-sign-in-alt'"></i>
            <span v-if="sidebarOpen">{{ isAuthenticated ? t.account : t.signIn }}</span>
          </div>
        </div>
      </div>

      <div class="sidebar-footer" v-if="sidebarOpen">
        <div class="footer-controls">
          <DarkModeToggle />
          <LanguageToggle />
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from '../store/index.js'
import { translations } from '../translations/index.js'
import LanguageToggle from './LanguageToggle.vue'
import DarkModeToggle from './DarkModeToggle.vue'

const router = useRouter()
const route = useRoute()

const currentLang = computed(() => store.currentLang)
const t = computed(() => translations[currentLang.value])
const sidebarOpen = computed(() => store.sidebarOpen)
const isAuthenticated = computed(() => store.token && store.user)

const showMore = ref(false)
const moreRoutes = ['/routine', '/planner', '/bookings', '/account', '/login']

const isActive = (path) => route.path === path

const goTo = (path) => { router.push(path) }

const goToMore = (path) => {
  showMore.value = false
  router.push(path)
}

const handleAccountClick = () => {
  goTo(isAuthenticated.value ? '/account' : '/login')
}

const handleAccountMore = () => {
  showMore.value = false
  handleAccountClick()
}

const toggleMore = () => { showMore.value = !showMore.value }
const toggleSidebar = () => { store.sidebarOpen = !store.sidebarOpen }
</script>

<style scoped>
/* ─── Mobile Bottom Nav ─── */
.mobile-nav { display: flex; }
.desktop-nav { display: none; }

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  justify-content: space-around;
  padding: 4px 0 env(safe-area-inset-bottom, 4px);
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

html.dark .bottom-nav {
  background: var(--surface, #141414);
  box-shadow: none;
  border-top: 1px solid var(--border, rgba(255,255,255,0.07));
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: #9e9e9e;
  cursor: pointer;
  padding: 8px 12px;
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  -webkit-tap-highlight-color: transparent;
}

.nav-item.active { color: #22c55e; }
.nav-item i { font-size: 20px; }
.nav-item span {
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

html.dark .nav-item { color: rgba(255,255,255,0.4); }
html.dark .nav-item.active { color: #22c55e; }

/* ─── More Sheet ─── */
.more-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 9999;
  display: flex;
  align-items: flex-end;
}

.more-sheet {
  width: 100%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 8px 0 env(safe-area-inset-bottom, 16px);
  max-height: 80vh;
  overflow-y: auto;
}

html.dark .more-sheet {
  background: #141414;
}

.more-handle {
  width: 36px;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  margin: 4px auto 12px;
}

html.dark .more-handle { background: rgba(255,255,255,0.15); }

.more-items { padding: 0 16px; }

.more-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 4px;
  cursor: pointer;
  border-radius: 12px;
  -webkit-tap-highlight-color: transparent;
}

.more-item:active { background: rgba(34,197,94,0.06); }

.more-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.more-icon i { color: #22c55e; font-size: 18px; }

html.dark .more-icon { background: rgba(34,197,94,0.1); }

.more-text { flex: 1; min-width: 0; }
.more-label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #212121;
}
.more-desc {
  display: block;
  font-size: 12px;
  color: #9e9e9e;
  margin-top: 1px;
}

html.dark .more-label { color: rgba(255,255,255,0.85); }
html.dark .more-desc { color: rgba(255,255,255,0.4); }

.more-arrow { color: #ccc; font-size: 12px; }
html.dark .more-arrow { color: rgba(255,255,255,0.2); }

.more-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 4px 0;
}
html.dark .more-divider { background: rgba(255,255,255,0.07); }

.more-footer { padding: 12px 4px 4px; }
.more-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

/* Transition */
.more-fade-enter-active, .more-fade-leave-active {
  transition: opacity 0.2s ease;
}
.more-fade-enter-active .more-sheet, .more-fade-leave-active .more-sheet {
  transition: transform 0.25s ease;
}
.more-fade-enter-from, .more-fade-leave-to { opacity: 0; }
.more-fade-enter-from .more-sheet { transform: translateY(100%); }
.more-fade-leave-to .more-sheet { transform: translateY(100%); }

/* ─── Desktop Sidebar ─── */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  display: none;
  flex-direction: column;
  z-index: 200;
  transition: width 0.3s ease;
}

html.dark .sidebar {
  background: var(--surface, #141414);
  border-color: var(--border, rgba(255,255,255,0.07));
}

.sidebar.collapsed { width: 60px; }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  min-height: 60px;
}

html.dark .sidebar-header { border-color: var(--border); }

.sidebar-logo { display: flex; align-items: center; gap: 10px; }

.logo-icon {
  width: 36px;
  height: 36px;
  background: #22c55e;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.logo-icon i { color: #FFF; font-size: 16px; }

.logo-text h1 {
  font-size: 14px;
  font-weight: 700;
  color: #212121;
  margin: 0;
  line-height: 1.2;
}
.logo-text span { font-size: 10px; color: #9e9e9e; }

html.dark .logo-text h1 { color: var(--text, rgba(255,255,255,0.85)); }
html.dark .logo-text span { color: var(--text-muted, rgba(255,255,255,0.4)); }

.sidebar-toggle {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  background: #fff;
  color: #9e9e9e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sidebar-toggle:hover { color: #22c55e; }

html.dark .sidebar-toggle {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text-muted);
}

.sidebar.collapsed .sidebar-header { justify-content: center; padding: 16px 8px; }

.sidebar-content { flex: 1; padding: 12px 8px; overflow-y: auto; }
.nav-section { margin-bottom: 16px; }

.nav-section-title {
  font-size: 10px;
  font-weight: 600;
  color: #bdbdbd;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 8px 12px 4px;
}
html.dark .nav-section-title { color: rgba(255,255,255,0.3); }

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: #757575;
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: 2px;
}
.sidebar-item i { font-size: 18px; width: 20px; text-align: center; flex-shrink: 0; }
.sidebar-item span { font-size: 14px; font-weight: 500; white-space: nowrap; }
.sidebar-item:hover { background: #f5f5f5; color: #212121; }
.sidebar-item.active { background: #f0fdf4; color: #22c55e; }

html.dark .sidebar-item { color: rgba(255,255,255,0.5); }
html.dark .sidebar-item:hover { background: rgba(255,255,255,0.05); color: var(--text); }
html.dark .sidebar-item.active { background: #22c55e; color: #fff; }
html.dark .sidebar-item.active i { color: #fff; }

.sidebar.collapsed .sidebar-item { justify-content: center; padding: 12px; }

.sidebar-footer { padding: 16px; border-top: 1px solid #e8e8e8; }
html.dark .sidebar-footer { border-color: var(--border); }
.footer-controls { display: flex; align-items: center; gap: 8px; justify-content: center; }

@media (min-width: 768px) {
  .mobile-nav { display: none; }
  .desktop-nav { display: flex; }
  .sidebar { display: flex; }
}

@media (max-width: 767px) {
  .bottom-nav { display: flex; }
  .sidebar { display: none !important; }
}
</style>
