const { MongoClient } = require('mongodb')

module.exports = {
  async connect (url, dbName) {
    this.url = url
    this.dbName = dbName
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db(dbName)
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name) {
    return this.db.collection(name)
  }
}
