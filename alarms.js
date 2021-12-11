const push = require('./push')
const monitorData = require('./monitors')

const hostname = "aleo1"

const reportInterval = 3600 * 1000

var lastReport = 0
var counter = 0

setInterval(() => {
    console
    if (monitorData.percentageCPU < 25) {
        counter++
    }
    else {
        counter = 0
    }

    if (counter >= 3) {
        now = Date.now()
        if (now - lastReport > reportInterval) {
            msg = `${hostname} cpu utilization alert: percentage = ${monitorData.percentageCPU}`
            push(msg)
            lastReport = now
        }
    }
    

}, 5000)
