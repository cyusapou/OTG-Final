// Auth middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    // Decode mock token (in production, use JWT verification)
    const user = JSON.parse(Buffer.from(token, 'base64').toString('utf8'))
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

// Role-based access control
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden - insufficient permissions' })
    }

    next()
  }
}

// Scope isolation middleware
export const attachScope = (req, res, next) => {
  const user = req.user

  if (user.role === 'Manager') {
    req.scope = { managerId: user.id, expressId: user.expressId }
  } else if (user.role === 'Admin') {
    req.scope = { expressId: user.expressId }
  } else if (user.role === 'SuperAdmin') {
    req.scope = {} // No filter - sees everything
  }

  next()
}
