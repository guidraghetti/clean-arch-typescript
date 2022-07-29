import 'module-alias/register'
import { MongoHelper } from '@/infra/db'
import { MONGO_DB, MONGO_URL, PORT } from './config/constants'

MongoHelper
  .connect(`${MONGO_URL}/${MONGO_DB}`)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
  })
  .catch(console.error)
