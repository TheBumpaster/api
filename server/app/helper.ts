
export const openAPIDoc = {
    swagger: '2.0',

    // all routes will now have /v3 prefixed.
    basePath: '/v1',

    info: {
        title: 'express-openapi project',
        version: '3.0.0'
    },

    definitions: {
        Error: {
            additionalProperties: true
        },
        User: {
            properties: {
                name: {
                    type: 'string'
                },
                friends: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/User'
                    }
                }
            },
            required: ['name']
        }
    },

    // paths are derived from args.routes.  These are filled in by fs-routes.
    paths: {},

    // tags is optional, and is generated / sorted by the tags defined in your path
    // docs.  This API also defines 2 tags in operations: "creating" and "fooey".
    tags: [
        // {name: 'creating'} will be inserted by ./api-routes/users.js
        // {name: 'fooey'} will be inserted by ./api-routes/users/{id}.js
        { description: 'Everything users', name: 'users' }
    ]
};
