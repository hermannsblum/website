const scraper = require('./scraper')

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  ops
) => {
  // helper function that processes a publication to match Gatsby's node structure
  const processPub = (pub, query) => ({
    ...pub,
    id: createNodeId(pub.title),
    parent: null,
    children: [],
    internal: {
      type: `GoogleScholarProfile`,
      content: JSON.stringify(pub),
      contentDigest: createContentDigest(pub),
      description: `
        Scientific publication scraped from Google Scholar results
        for query '${query}' by gatsby-source-google-scholar
      `,
    },
    search_string: query,
  })

  await Promise.all(ops.queries.map(query => scraper.search(query)))
    .then(responses =>
      responses.forEach((response, index) =>
        response.results.forEach(result =>
          createNode(processPub(result, ops.queries[index]))
        )
      )
    )
    .catch(console.error)
}
