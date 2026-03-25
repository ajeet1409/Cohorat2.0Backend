import dotenv from 'dotenv'
dotenv.config()
import { Redis } from 'ioredis';

const redis = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
}); 



redis.on('connect',()=>{
    console.log('redis is connect to server')
})
// await redis.set('key','value')

// const value = await redis.get('key');
// console.log(value);

export default redis