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
    const paperLinkIds = []
    item["external-ids"]["external-id"].forEach(externalId => {
      const paperLinkId = createNodeId(externalId["external-id-url"].value)
      paperLinkIds.push(paperLinkId)
      createNode({
        id: paperLinkId,
        parent: null,
        children: [],
        url: externalId["external-id-url"].value,
        identifier: externalId["external-id-value"],
        internal: {
          type: externalId["external-id-type"],
          content: JSON.stringify(externalId),
          contentDigest: createContentDigest(externalId),
        }
      })
    })
    const summary = item["work-summary"][0]
    createNode({
      id: createNodeId(summary.title.title.value),
      parent: null,
      children: paperLinkIds,
      title: summary.title.title.value,
      date: {
        day: summary["publication-date"].day.value,
        month: summary["publication-date"].month.value,
        year: summary["publication-date"].year.value,
      },
      summary: summary,
      internal: {
        type: "Paper",
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      },
    })
  })

  return
}
