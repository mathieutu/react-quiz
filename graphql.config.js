module.exports = {
  name: 'React Quiz API',
  schema: process.env.REACT_APP_API_URL,
  documents: ['./src/graphql/**/*.gql'],
  extensions: {
    codegen: {
      overwrite: true,
      generates: {
        './src/graphql/codegen.ts': {
          plugins: [
            'typescript',
            'typescript-operations',
            'typescript-react-apollo',
            { add: { content: '/* File automatically generated by yarn generate:graphql */' } },
            { add: { content: '/* eslint-disable */' } },
          ],
          config: {
            avoidOptionals: true,
            skipTypename: true,
            withHooks: true,
            withHOC: false,
            withComponent: false,
            scalars: {
              uuid: 'string',
              date: 'string',
              timestamptz: 'string',
              jsonb: 'string[]',
            },
          },
        },
        './src/graphql/schema.json': { plugins: ['introspection'] },
      },
    },
  },
}
