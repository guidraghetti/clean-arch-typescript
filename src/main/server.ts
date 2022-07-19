import 'module-alias/register'
import { MongoHelper } from '@/infra/db'
import app from './config/app'
import { MONGO_DB, MONGO_URL, PORT } from './config/constants'

MongoHelper
  .connect(`${MONGO_URL}/${MONGO_DB}`)
  .catch(console.error)

app.listen(
  PORT, () => console.log(`Server is running on http://localhost:${PORT}`
  ))
