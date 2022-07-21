export const signupPath = {
  post: {
    tags: ['Signup'],
    summary: 'API to create a user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParamsSchema'
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
              $ref: '#/schemas/accountSchema'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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
