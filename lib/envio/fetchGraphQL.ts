function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) {
  return fetch("https://indexer.dev.hyperindex.xyz/3e100b4/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  }).then((result) => result.json());
}

export default fetchGraphQL;
