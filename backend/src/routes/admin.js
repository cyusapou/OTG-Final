// Admin routes - protected endpoints for admin dashboards

export const adminRoutes = {
  // Manager endpoints
  getDrivers: '/api/admin/drivers',
  createDriver: '/api/admin/drivers',
  updateDriver: '/api/admin/drivers/:id',
  suspendDriver: '/api/admin/drivers/:id/status',
  getTrips: '/api/admin/trips/live',
  createSchedule: '/api/admin/schedule',
  getReports: '/api/admin/reports',

  // Express Admin endpoints
  getManagers: '/api/admin/managers',
  createManager: '/api/admin/managers',
  getFinanceSummary: '/api/admin/finance/summary',
  getFleet: '/api/admin/fleet',
  registerBus: '/api/admin/fleet',
  getComplaints: '/api/admin/complaints',

  // RURA endpoints
  getExpresses: '/api/rura/expresses',
  createExpress: '/api/rura/expresses',
  getCompliance: '/api/rura/compliance',
  issueViolation: '/api/rura/compliance/violation',
  getAllFeedback: '/api/rura/feedback',
  getAnalytics: '/api/rura/analytics',
  createAnnouncement: '/api/rura/announcements',
  getAllUsers: '/api/rura/users',
  updateUserRole: '/api/rura/users/:id/role'
}

export default adminRoutes
