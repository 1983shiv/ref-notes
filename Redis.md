## introduction to Redis - NodeJS, Docker, JavaScript
https://www.youtube.com/watch?v=J6SZYMTY7g8

Create volume to persist data on docker
```bash
docker volume create redis_data
```
docker command to run redis server, make sure you have redis install on your ubuntu machine
```bash
docker run -d -p 6379:6379 --name redis_db -v redis_data:/data redis redis-server --appendonly yes --requirepass 123456
```
-d = detached mode
-p = port mapping
redis_db = container name
-v = volume to be used, to this path :/data
--appendonly yes = it will allow to store data on disk


installing redis insight, which is gui for redis
redis.js
```bash
docker run -d -p 5540:5540 --name redis_gui redislabs/redisinsight:latest
```

get the ip for running container
```bash
docker inspect -f '{{range .NetworkSettings.Network}}{{.IPAddess}}{{end}}' <containerID>


mkdir redisdemo
npm init -y
npm i dotenv ioredis

```bash
.env {
    REDIS_HOST=139.59.9.128
    REDIS_PORT=6379
    REDIS_PSWD_123456
}

```bash
import Redis from "ioredis";

let client;

/**
Initialize the Redis client with the given configuration
@param {Object} config - The configuration object
@param {string} config.host - The host of the Redis server
@param {number} config.port - The port of the Redis server
@param {string} config.password - The password of the Redis server
@returns {Redis} The initialized Redis client
*/

const initialize = async (payload) => {
    client = new Redis(payload);

    client.on("connect", () => {
        console.info("Connected to Redis");
    });

    client.on("error", (err) => {
        console.warn("Redis error: ", err);
    })

    client.on("end", () => {    
        console.info("Redis connection closed");
    })

    const _gracefulShutdown = async (err) => {
        console.info("Attempting to gracefully shutdown the Redis client through app termination");

        try {
            await client.quit();
            console.info("Redis client closed successfully");
            process.exit(0);
        } catch (error) {
            console.error("Error during Redis client shutdown: ", error);
            process.exit(1);
        }
    }

    process.on("SIGINT", _gracefulShutdown);
    process.on("SIGTERM", _gracefulShutdown);   
    process.on("uncaughtException", _gracefulShutdown);
    process.on("unhandledRejection", _gracefulShutdown);
    process.on("SIGQUIT", _gracefulShutdown);

}

const setKeyValue = async (key, value) => client.set(key, value);
const getKeyValue = async (key) => client.get(key);
const deleteKeyValue = async (key) => client.del(key);
const checkIfKeyExists = async (key) => client.exists(key);
const setExpiry = async (key, ttl) => client.expire(key, ttl);              
const getExpiry = async (key) => client.ttl(key);
const getAllKeys = async () => client.keys("*");

export default { initialize, setKeyValue, getKeyValue, deleteKeyValue, checkIfKeyExists, setExpiry, getExpiry, getAllKeys };

```


index.js
```bash
import dotenv from "dotenv";
import redisService from "./redis.js"

# IIFE PATTERN
(async () => {
    dotenv.config();

    const {REDIS_HOST, REDIS_PORT, REDIS_PSWD } = process.env;
    redisService.initialize({
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PSWD
    });

    setTimeout(() => {
        redisService.setKeyValue("test", "connection works");
    }, 2000)


    setTimeout(() => {
        redisService.getKeyValue("test").then((res) => {
            console.log(res)
        });
    }, 5000)

})();

```