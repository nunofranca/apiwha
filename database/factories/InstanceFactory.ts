import Instance from 'App/Models/Instance'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Instance, ({ faker }) => {
  return {
    instance: faker.string.alphanumeric(30),
    expiration: faker.date.future(),
    name: faker.lorem.words(1),
  }
}).build()

