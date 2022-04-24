const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require ('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
    
    // issues ping to server to prevent Heroku dynos from sleeping
    // setInterval(() => {
    //     console.log(`Pinging ${process.env.APP_URL}`);
    //     http.get(process.env.APP_URL);   
    // }, 600000);
})