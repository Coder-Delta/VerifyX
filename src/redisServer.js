import { Redis } from "@upstash/redis";


const redis = new Redis({
  url: 'https://great-bat-38659.upstash.io',
  token: 'AZcDAAIncDFiNjIyNzc3OTM2ODA0Yjg5YTQ3MTIyNGE0MjFlYzdhMHAxMzg2NTk',
})

export default redis;
