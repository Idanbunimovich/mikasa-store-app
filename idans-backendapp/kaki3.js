
let RedisClient = require('redis');
const {promisify} = require('util')
let redis = RedisClient.createClient()

redis.set('MichaelFrumkin', 'AQEDATWaSWMES7nmAAABeaoeIwMAAAF5ziqnA04Agcsb7X5l-Zn_qPcYck3ga7sGtmWmzwdLCo_cRnqv8pYagZabAKpqIz7GBXhKdbGfGf8kb__MdpQ4gYUzVJrsbRXj398oz7SD5RlPfr_3fm_OOn0m', function (err, reply) {

    console.log( reply);
    console.log(err)
});

redis.get("MichaelFrumkin", function (err, reply) {
    console.log( reply);
    console.log(err)
});

