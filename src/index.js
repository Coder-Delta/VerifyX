import express from 'express'
import redis from './redisServer.js'

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (_, res) => {
  await redis.set('test', 'OK', { ex: 30 })
  const data = await redis.get('test')
  res.send(data)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
