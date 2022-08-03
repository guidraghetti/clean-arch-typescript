import 'module-alias/register'
import { MONGO_DB, MONGO_URL, PORT } from '@/main/config/constants'
import { app } from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

MongoHelper.connect(`${MONGO_URL}/${MONGO_DB}`).then(() => console.log('Mongo connected')).catch(console.error)
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
