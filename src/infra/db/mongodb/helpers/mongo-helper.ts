import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string) {
    this.client = MongoClient.connect(url)
  },
  async disconnect () {
    await this.client.close()
  }
}
