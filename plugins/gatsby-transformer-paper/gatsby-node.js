async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode,
}) {
  const { createNode, createParentChildLink } = actions
  if (node.internal.type === "GoogleScholar") {
    const paperId = createNodeId(node.title.toLowerCase())
    let paperNode = getNode(paperId)
    if (!paperNode) {
      // avoid overwriting
      paperNode = {
        id: createNodeId(node.title.toLowerCase()),
        title: node.title,
        date: {
          year: node.year,
        },
        internal: {
          type: "Paper",
          content: JSON.stringify(node),
          contentDigest: createContentDigest(node),
        },
      }
      createNode(paperNode)
    }
    let url = node.url
    // always use https
    url = url.replace("http://", "https://")
    const paperLink = {
      id: createNodeId(url),
      url: url,
      identifier: null,
      internal: {
        type: "uri",
        content: JSON.stringify(node.url),
        contentDigest: createContentDigest(node.url),
      },
    }
    if (node.url.includes("arxiv.org")) {
      const identifierPos = node.url.indexOf("arxiv.org") + 14
      paperLink.identifier = `arXiv:${node.url.slice(
        identifierPos,
        node.url.length
      )}`
      paperLink.internal.type = "arxiv"
    }
    createNode(paperLink)
    createParentChildLink({
      parent: paperNode,
      child: paperLink,
    })
  } else if (node.internal.type === "OrcidWork") {
    const summary = node["work-summary"][0]
    const paperId = createNodeId(summary.title.title.value.toLowerCase())
    let paperNode = getNode(paperId)
    // we always write over the scholar entry, but we save the children
    const existingChildren = paperNode ? paperNode.children : []
    createNode({
      id: paperId,
      title: summary.title.title.value,
      children: existingChildren,
      date: {
        month: parseInt(summary["publication-date"].month.value),
        year: parseInt(summary["publication-date"].year.value),
      },
      internal: {
        type: "Paper",
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })
    // since we don't know when the paper has been created, load the correct
    // paper node for relation
    paperNode = getNode(paperId)
    node["external-ids"]["external-id"].forEach(externalId => {
      let url = externalId["external-id-url"].value
      // remove the versioning from arxiv urls
      if (url.includes("arxiv") && url.charAt(url.length - 2) === "v") {
        url = url.slice(0, url.length - 2)
      }
      // always use https
      url = url.replace("http://", "https://")
      const paperLink = {
        id: createNodeId(url),
        url: url,
        identifier: externalId["external-id-value"],
        internal: {
          type: externalId["external-id-type"],
          content: JSON.stringify(externalId),
          contentDigest: createContentDigest(externalId),
        },
      }
      createNode(paperLink)
      createParentChildLink({ parent: paperNode, child: paperLink })
    })
  }
}

exports.onCreateNode = onCreateNode
