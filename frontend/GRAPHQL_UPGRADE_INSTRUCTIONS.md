Steps to upgrade the GraphQL server schema to include `spec.cleanup` and regenerate frontend types

1. Apply the schema changes
   - Add the `Cleanup` and `CleanupInput` types to the GraphQL schema (see `schema-proposed.graphql` for a minimal example).
   - Update the `Spec` (and corresponding input) type to include a `cleanup: Cleanup` / `cleanup: CleanupInput` field.
   - Ensure the mutation input types that accept Template spec use the updated `SpecInput`.

2. Regenerate the GraphQL server artifacts
   - Depending on the server implementation (gqlgen, Apollo, etc.), run the code generation step to update the generated resolvers/types.
   - Run server tests and ensure the new fields are marshalled correctly from/to Kubernetes Template objects.

3. Deploy the updated GraphQL server to an environment reachable by the frontend dev environment (e.g., preprod).

4. Regenerate frontend types locally
   - In the `frontend` folder, set `GRAPHQL_URL` to the updated GraphQL server URL, or put the updated schema locally and set `GRAPHQL_SCHEMA_FILE` (if supported).
   - Run:

```bash
cd frontend
npm install
npm run generate
```

5. Build & test frontend

```bash
npm run build
npm test
```

6. Confirm the frontend now compiles with `spec.cleanup` types and that create/update operations work as expected.

If you want, I can prepare a PR for the frontend changes (queries, mutations, UI mapping) and this schema proposal; you'll still need to apply the backend change and run a deployment so I can finalize the generated types here.