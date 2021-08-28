const { MongoClient } = require('mongodb')

module.exports = {
  async connect (url) {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db()
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name) {
    return this.db.collection(name)
  }
}
