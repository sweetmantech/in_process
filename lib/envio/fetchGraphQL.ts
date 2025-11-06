function fetchGraphQL(
  indexerId: string,
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) {
  return fetch(`https://indexer.dev.hyperindex.xyz/${indexerId}/v1/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  }).then((result) => result.json());
}

export default fetchGraphQL;
