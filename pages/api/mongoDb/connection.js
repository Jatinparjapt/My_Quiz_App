import mongoose from 'mongoose'

const connection = {}
async function connect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.DB_CONNECTION_STRING)

  connection.isConnected = db.connections[0].readyState
}

async function disconnect() {
  if (!connection.isConnected) {
    return
  }

  await mongoose.disconnect()
}

export default { connect, disconnect }