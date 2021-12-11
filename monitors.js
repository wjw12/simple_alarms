var os = require("os");

var data = {}

//Create function to get CPU information
function cpuAverage() {
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();
  for(var i = 0, len = cpus.length; i < len; i++) {

    var cpu = cpus[i];

    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    totalIdle += cpu.times.idle;
  }

  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function measureCpu(time) {
    var startMeasure = cpuAverage();
    await timeout(time)
    var endMeasure = cpuAverage(); 
    
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;

    //Calculate the average percentage CPU usage
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    return percentageCPU
}


setInterval(() => {
    measureCpu(100).then(r => data.percentageCPU = r)
}, 5000)

module.exports = data