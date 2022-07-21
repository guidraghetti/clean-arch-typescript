export const surveysPath = {
  get: {
    security: [
      {
        apiKeySchema: []
      }
    ],
    tags: ['Survey'],
    summary: 'API to get all surveys',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParamsSchema'
          }
        }
      }
    },

    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveysSchema'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
