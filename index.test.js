const timeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

test('the cell\'s cron organelle skips execution cycles properly once started', async () => {
  const Plasma = require('organic-plasma')
  const Organelle = require('./index')
  Organelle.prototype.execute = async () => {
    return timeout(2 * 1000)
  }
  let plasma = new Plasma()
  let dna = {
    intervalMiliseconds: 1000
  }
  let instance = new Organelle(plasma, dna)
  instance.start()
  await timeout(2 * 1100)
  expect(instance.executeCallSkipped).toBe(true)
  instance.dispose()
})

xtest('any exceptions within execution cycle are thrown and main process is terminated', async () => {

})
