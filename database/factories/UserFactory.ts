import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import InstanceFactory from "Database/factories/InstanceFactory";
import Hash from '@ioc:Adonis/Core/Hash'

export default Factory.define(User, async ({faker}) => {
    return {
        name: 'nunofranca',
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: await Hash.make('123mudar'),
        phone: faker.phone.number()
    }
}).relation('instances', () => InstanceFactory)
    .build()
