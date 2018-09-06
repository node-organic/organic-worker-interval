# organic-worker-interval

Abstract Organelle providing interval based function execution with the followup 
properties:

* executions will be skipped in case of overlapping between them
* executions are setInterval based in the current process

## dna

```
{
   log: Boolean,
   intervalMiliseconds: Number,
   startOn: String,
   disposeOn: String defaults to "kill",
   startOnInitialization: Boolean
 }
```

## usage

1. create your organelle `myWorker.js`
2. implement `myWorker.js`:

```
const IntervalWorker = require('organic-worker-interval')

module.exports = class extends IntervalWorker {
  async execute () {
    console.log('running') // TODO add your cron execute logic
  }
}
```

3. use your organelle within a cell or standalone:

```
let Plasma = require('organic-plasma')
let MyWorker = require('./myWorker')

let plasma = new Plasma()

let worker = new MyWorker(plasma, {
  log: true,
  intervalMiliseconds: 1000 // every second  
})
worker.start()
plasma.on('some-chemical', () => {
  worker.dispose()
})
```
