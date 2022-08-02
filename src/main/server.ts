import 'module-alias/register'
import serverless from 'serverless-http'
import { LAMBDA, MONGO_DB, MONGO_URL, PORT } from '@/main/config/constants'
import { setupApp } from '@/main/config/app'
import { MongoHelper } from '../infra/db'

export const handler = serverless(setupApp)

if (!LAMBDA) {
  setupApp().then(app => app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))).catch(console.error)
}

MongoHelper.connect(`${MONGO_URL}/${MONGO_DB}`).then(() => console.log('Mongo connected')).catch(console.error)
