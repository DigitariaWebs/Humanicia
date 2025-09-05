import rateLimit from 'express-rate-limit';

// In-memory token blacklist (in production, use Redis or database)
export const tokenBlacklist = new Set<string>();

// Rate limiting for authentication endpoints
export const authRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX || '5'), // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for general API endpoints
export const apiRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for contact form
export const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '3'), // Limit each IP to 3 contact form submissions per hour
  message: {
    error: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security headers middleware
export function securityHeaders() {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  };
}

// Input sanitization function
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 1000); // Limit length
}

// CSRF token generation
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Validate CSRF token
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length === 64;
}

// Password strength validation
export function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Audit logging
export interface AuditLog {
  timestamp: Date;
  action: string;
  userId?: string;
  ip: string;
  userAgent: string;
  details?: Record<string, unknown>;
}

export class AuditLogger {
  private logs: AuditLog[] = [];

  log(logEntry: Omit<AuditLog, 'timestamp'>) {
    const entry: AuditLog = {
      ...logEntry,
      timestamp: new Date()
    };

    this.logs.push(entry);

    // In production, you would send this to a logging service
    console.log('[AUDIT]', JSON.stringify(entry));

    // Keep only last 1000 logs in memory
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
  }

  getLogs(): AuditLog[] {
    return [...this.logs];
  }

  getLogsByUser(userId: string): AuditLog[] {
    return this.logs.filter(log => log.userId === userId);
  }

  getLogsByAction(action: string): AuditLog[] {
    return this.logs.filter(log => log.action === action);
  }
}

export const auditLogger = new AuditLogger();

// Simple rate limiting check for Next.js routes
export function checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  // In production, use Redis for this
  const globalScope = global as typeof global & {
    rateLimitStore?: Map<string, { count: number; resetTime: number }>;
  };
  const attempts =
    globalScope.rateLimitStore || (globalScope.rateLimitStore = new Map());
  const now = Date.now();
  const attempt = attempts.get(key);

  if (!attempt) {
    attempts.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (now > attempt.resetTime) {
    attempts.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (attempt.count >= maxAttempts) {
    return false;
  }

  attempt.count++;
  return true;
}
