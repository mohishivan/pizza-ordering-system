const GRAPHQL_ENDPOINT = "https://core-graphql.dev.waldo.photos/pizza"
const getGraph = ({operationName, query, variables=null}) => {
  return fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        // redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({"operationName": operationName, "query": query, "variables": variables}),
  })
}
export default getGraph
