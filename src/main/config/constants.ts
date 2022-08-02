export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const MONGO_DB = process.env.MONGO_DB || 'test'
export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 12
export const RUNNING_MESSAGE = `Server is running on ${PORT}s`
export const LAMBDA = process.env.LAMBDA || false
