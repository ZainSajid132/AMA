import { Hono } from 'hono'
import { cors } from 'hono/cors'
import users from './routes/users'
import customer from './routes/customer'
import common from './routes/common'


const app = new Hono()

// Global CORS
app.use('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// Mount all user CRUD endpoints
app.route('/', users)
app.route('/', customer)
app.route('/common', common)

export default app;
