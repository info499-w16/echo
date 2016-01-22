'use strict'

const dgram = require('dgram')
const http = require('http')
const uuid = require('uuid')

const REGISTRATION_PORT = process.env.REGISTRATION_PORT || 8888

function timeLog (msg) {
  console.log(`${new Date().toUTCString()}: ${msg}`)
}

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end('{"hello": "world"}\n')
  timeLog.log('Served Request')
}).listen(80)

timeLog('Echo listening on http://localhost')

const client = dgram.createSocket('udp4')

client.bind(REGISTRATION_PORT, () => {
  // This is critical for properly functioning, since the whole point is that
  // we DONT know what might be listening
  client.setBroadcast(true)

  const instanceData = JSON.stringify({
    name: 'echo',
    version: '0.0.1',
    id: uuid.v4()
  })

  function sendRegistrationData () {
    client.send(instanceData, 0, instanceData.length, REGISTRATION_PORT, '255.255.255.255', (err) => {
      if (err) throw err

      timeLog('Sent registration data')
    })
  }

  sendRegistrationData()
  setInterval(sendRegistrationData, 1000 * 30) // Send every 30 seconds
})
