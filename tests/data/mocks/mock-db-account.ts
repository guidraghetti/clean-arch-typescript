import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository, CheckAccountByEmailRepository } from '@/data/protocols'

import { faker } from '@faker-js/faker'
import ObjectID from 'bson-objectid'
import { ObjectId } from 'mongodb'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: ObjectID().toHexString(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: ObjectId
  token: string

  async updateAccessToken (id: ObjectId, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
