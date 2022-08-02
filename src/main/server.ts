import 'module-alias/register'
import serverless from 'serverless-http'
import { LAMBDA, PORT } from './config/constants'
import { setupApp } from '@/main/config/app'

export const handler = serverless(setupApp)

if (!LAMBDA) {
  setupApp().then(app => app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))).catch(console.error)
}
