const fetch = require(`node-fetch`)

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  // Download data from a remote API.
  const data = await fetch(
    "https://pub.orcid.org/v2.1/0000-0002-1713-7877/works",
    { headers: { Accept: "application/json" } }
  )
  const dataResult = await data.json()
  dataResult.group.forEach(item => {
    createNode({
      id: createNodeId(item['work-summary'][0].path),
      parent: null,
      children: [],
      ...item,
      internal: {
        type: "OrcidWork",
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      }
    })
  })

  return
}
