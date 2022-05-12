export class UniqueError extends Error {
  constructor (field: string) {
    super(`${field} already in use`)

    this.name = 'UniqueError'
  }
}
