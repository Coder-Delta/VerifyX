import express from 'express'
import redis from './redisServer.js'
import dotenv from 'dotenv';
dotenv.config();// Load environment variables from .env file
import { testMail } from './Controllers/user.controller.js';


const app = express()
app.use(express.json())

const port = process.env.PORT || 3000
// Define a route for testing Redis functionality
app.get('/', async (_, res) => {
  await redis.set('test', 'OK', { ex: 30 })
  const data = await redis.get('test')
  res.send(data)
})// redis.set is used to set a key 'test' with value 'OK' that expires in 30 seconds. 
// redis.get retrieves the value of 'test'.

// Define a route for sending test email
app.post('/send-mail', testMail)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

export { app };