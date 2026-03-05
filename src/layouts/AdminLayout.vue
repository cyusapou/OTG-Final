<template>
  <div class="admin-shell" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <AdminSidebar :role="userRole" :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="admin-main">
      <AdminTopBar :user="currentUser" :role="userRole" />
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store/index.js'
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminTopBar from '../components/admin/AdminTopBar.vue'

const router = useRouter()
const sidebarCollapsed = ref(false)

const userRole = computed(() => localStorage.getItem('userRole') || store.userRole)
const currentUser = computed(() => store.user || {})

// Role guard - redirect if not authenticated
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
})
</script>

<style scoped>
.admin-shell {
  display: flex;
  height: 100vh;
  background: #f5f6fa;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 100vw !important;
  width: 100%;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

/* Override mobile body max-width constraint */
:global(body.admin-layout) {
  max-width: 100vw !important;
  width: 100%;
}
</style>
