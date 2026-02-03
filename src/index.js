import express from 'express'
import redis from './redisServer.js'
import dotenv from 'dotenv';
dotenv.config();// Load environment variables from .env file
import { testMail, verifyOtp } from './Controllers/user.controller.js';

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

// Define a route for testing Redis functionality
app.get('/', async (_, res) => {
  await redis.set('test', 'OK', { ex: 30 })
  const data = await redis.get('test')
  res.send(data)
})

// ADD THIS NEW TEST ENDPOINT
app.get('/test-redis', async (req, res) => {
  try {
    console.log('\n========== TESTING REDIS CONNECTION ==========');
    
    // Test SET
    const testKey = 'test:connection';
    const testValue = 'Hello Redis ' + Date.now();
    
    const setResult = await redis.set(testKey, testValue, { ex: 60 });
    console.log('SET result:', setResult);
    
    // Test GET
    const getResult = await redis.get(testKey);
    console.log('GET result:', getResult);
    console.log('Values match:', getResult === testValue);
    
    // Test TTL
    const ttl = await redis.ttl(testKey);
    console.log('TTL:', ttl);
    
    res.json({
      success: true,
      setResult,
      getResult,
      valuesMatch: getResult === testValue,
      ttl,
      message: 'Redis is working!'
    });
  } catch (error) {
    console.error('Redis test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Your existing routes
app.post('/send-mail', testMail)
app.post('/verify-otp', verifyOtp)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

export { app };