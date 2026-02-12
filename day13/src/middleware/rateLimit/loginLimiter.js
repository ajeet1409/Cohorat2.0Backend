import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // only 5 login attempts
  message: "Too many requests, try to login try again later."
}
)

export default loginLimiter