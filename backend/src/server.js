import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body

  // Mock authentication - for testing purposes
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  // Mock user data based on role
  const mockUsers = {
    Driver: {
      id: 'DRV001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'driver@test.com',
      role: 'Driver',
      expressId: 'EXP001'
    },
    Manager: {
      id: 'MGR001',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'manager@test.com',
      role: 'Manager',
      expressId: 'EXP001'
    },
    Admin: {
      id: 'ADM001',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'admin@test.com',
      role: 'Admin',
      expressId: 'EXP001'
    },
    SuperAdmin: {
      id: 'SPA001',
      firstName: 'Bob',
      lastName: 'Wilson',
      email: 'rura@test.com',
      role: 'SuperAdmin'
    }
  }

  // Check role from request or default to Driver
  const selectedRole = role || 'Driver'
  const user = mockUsers[selectedRole]

  if (!user) {
    return res.status(401).json({ error: 'Invalid role' })
  }

  // Mock token generation
  const token = Buffer.from(JSON.stringify(user)).toString('base64')

  res.json({
    token,
    user,
    role: selectedRole
  })
})

// Test endpoint for all roles
app.get('/api/auth/test-users', (req, res) => {
  res.json({
    roles: [
      { role: 'Driver', email: 'driver@test.com' },
      { role: 'Manager', email: 'manager@test.com' },
      { role: 'Admin', email: 'admin@test.com' },
      { role: 'SuperAdmin', email: 'rura@test.com' }
    ],
    message: 'Use any role with any password to test'
  })
})

// Admin Routes (placeholder - will be expanded)
app.get('/api/admin/drivers', (req, res) => {
  res.json([])
})

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
