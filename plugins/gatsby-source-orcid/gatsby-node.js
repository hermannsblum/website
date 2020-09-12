const fetch = require(`node-fetch`)

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

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
  await asyncForEach(dataResult.group, async item => {
    // get the detailed info
    const details = await fetch(
      `https://pub.orcid.org/v2.1${item['work-summary'][0].path}`,
      { headers: { Accept: "application/json" } }
    )
    const detailsResult = await details.json()
    createNode({
      id: createNodeId(item["work-summary"][0].path),
      parent: null,
      children: [],
      ...item,
      ...detailsResult,
      internal: {
        type: "OrcidWork",
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      },
    })
  })

  return
}
