import { createService, request } from './api.js'

const service = createService('sessions')
const usersService = createService('users')

export const sessionService = {
  ...service,

  async login(username, password) {
    // For OTG-Server, we need to check if users exist and validate credentials
    // The server uses plain text password comparison (in production, use bcrypt)
    try {
      const users = await usersService.getAll({ username })
      console.log('Found users:', users)
      const user = users[0]
      if (!user || user.password !== password) {
        console.log('Invalid credentials for user:', username)
        return null
      }
      if (user.isActive === false) {
        console.log('User is inactive:', username)
        return null
      }

      console.log('User authenticated:', user)

      // Create a session entry
      const session = await service.create({
        userId: user.id,
        role: user.role,
        companyId: user.companyId,
        depotId: user.depotId,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours
      })

      // Update user's last login
      await usersService.patch(user.id, { lastLoginAt: new Date().toISOString() })

      console.log('Session created:', session)
      return { session, user }
    } catch (error) {
      console.error('Login error:', error)
      return null
    }
  },

  async validate(sessionId) {
    try {
      const session = await service.getById(sessionId)
      if (new Date(session.expiresAt) < new Date()) {
        await service.remove(sessionId)
        return null
      }
      return session
    } catch {
      return null
    }
  },

  async logout(sessionId) {
    try { await service.remove(sessionId) } catch {}
  },
}
