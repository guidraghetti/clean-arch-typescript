import serverless from 'serverless-http'
import { MongoHelper } from '@/infra/db'
import { app } from '@/main/config/app'
import { MONGO_URL, MONGO_DB } from '@/main/config/constants'

const handleApp = serverless(app)

export const handler = async (event: Object, context: Object): Promise<Object> => {
  MongoHelper.connect(`${MONGO_URL}/${MONGO_DB}`).then(() => console.log('Mongo connected')).catch(console.error)
  return handleApp(event, context)
}
