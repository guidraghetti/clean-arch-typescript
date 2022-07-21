export const forbidden = {
  description: 'Invalid access',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/errorSchema'
      }
    }
  }
}
