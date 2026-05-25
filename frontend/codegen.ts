import type { CodegenConfig } from '@graphql-codegen/cli';

const schemaFile = process.env.GRAPHQL_SCHEMA_FILE;
const schemaUrl =
  (process.env.GRAPHQL_URL || 'https://graphql.preprod.crownlabs.polito.it') +
  '/schema';

const schemaSource = schemaFile
  ? { [schemaFile]: { handleAsSDL: true } }
  : { [schemaUrl]: { handleAsSDL: true } };

const config: CodegenConfig = {
  schema: schemaSource,
  documents: ['./src/**/*.ts', './src/**/*.graphql'],
  generates: {
    './src/generated-types.tsx': {
      config: {
        preResolveTypes: true,
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  config: {},
};

export default config;
