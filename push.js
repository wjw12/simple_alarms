const fetch = require('node-fetch')
const HOST = "https://api.pushover.net/1/messages.json"
const TOKEN = 'a8ff1871a7nos8bhe556k6wa1xjbrd'
const USER = 'uzz9sn73ogtu35se4pxfdqdy3rr1em'

module.exports = async function push_msg(msg) {
    if (typeof msg === 'object') msg = JSON.stringify(msg)
    var res = await fetch(`${HOST}?token=${TOKEN}&user=${USER}&title=Arbitrage&message=${msg}`, {
        method: 'POST'
    })
    try {
        var body = await res.json()
        console.log(body)
    }
    catch (e) {
        console.log(e)
    }
}

