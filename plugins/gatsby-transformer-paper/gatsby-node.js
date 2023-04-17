const he = require("he")

function cleanUrl(url) {
  // always use https
  url = url.replace("http://", "https://")
  // remove the versioning from arxiv urls
  if (url.includes("arxiv") && url.charAt(url.length - 2) === "v") {
    url = url.slice(0, url.length - 2)
  }
  return url
}

async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode,
}) {
  const { createNode, createParentChildLink, createNodeField } = actions
  if (node.internal.type === "GoogleScholarProfile") {
    const paperId = createNodeId(
      node.title.toLowerCase().trim().replace(/\s+/g, " ")
    )
    let paperNode = getNode(paperId)
    // some processing for axiv
    let journal = node.journal
    let arxiv = null
    if (journal.includes("arXiv")) {
      journal = null
      const cutPosition = node.journal.indexOf("arXiv:") + 6
      arxiv = node.journal.slice(cutPosition, cutPosition + 10)
    }
    // save the children before overwrite
    let existingChildren = paperNode ? paperNode.children : []
    existingChildren = existingChildren.map(childId => getNode(childId))
    if (!paperNode || paperNode.creator === "google-scholar") {
      paperNode = {
        id: paperId,
        title: node.title,
        creator: "google-scholar-profile",
        journal: journal,
        authors: node.authors,
        date: {
          year: parseInt(node.year),
          // parse month from arxiv if possible
          month: arxiv ? parseInt(arxiv.slice(2, 4)) : 13,
        },
        internal: {
          type: "Paper",
          content: JSON.stringify(node),
          contentDigest: createContentDigest(node),
        },
      }
    } else {
      // ORCID
      // add journal and author info
      paperNode.journal = paperNode.journal || journal
      paperNode.authors = node.authors
      delete paperNode.internal.owner
    }
    createNode(paperNode)
    existingChildren.forEach(child => {
      delete child.internal.owner
      createNode(child)
      createParentChildLink({
        parent: paperNode,
        child: child,
      })
    })
    if (
      arxiv &&
      existingChildren.filter(child => child.internal.type === "arxiv")
        .length === 0
    ) {
      const paperLink = {
        id: createNodeId(arxiv),
        url: `https://arxiv.org/abs/${arxiv}`,
        internal: {
          type: "arxiv",
          content: JSON.stringify(arxiv),
          contentDigest: createContentDigest(arxiv),
        },
      }
      createNode(paperLink)
      createParentChildLink({
        parent: paperNode,
        child: paperLink,
      })
    }
  } else if (node.internal.type === "GoogleScholar") {
    // check if paper contains correct author
    if (
      !node.authors.find(
        author => author.url && author.url.includes("user=2Pxx8QIAAAAJ")
      )
    ) {
      return
    }
    const paperId = createNodeId(
      node.title.toLowerCase().trim().replace(/\s+/g, " ")
    )
    let paperNode = getNode(paperId)
    if (!paperNode) {
      // avoid overwriting
      paperNode = {
        id: paperId,
        title: node.title,
        creator: "google-scholar",
        date: {
          year: parseInt(node.year),
          month: 13,
        },
        internal: {
          type: "Paper",
          content: JSON.stringify(node),
          contentDigest: createContentDigest(node),
        },
      }
      createNode(paperNode)
    }
    paperNode = getNode(paperId)
    const url = cleanUrl(node.url)
    const paperLink = {
      id: createNodeId(url),
      url: url,
      internal: {
        type: "uri",
        content: JSON.stringify(node.url),
        contentDigest: createContentDigest(node.url),
      },
    }
    if (node.url.includes("arxiv.org")) {
      paperLink.internal.type = "arxiv"
    }
    createNode(paperLink)
    createParentChildLink({
      parent: paperNode,
      child: paperLink,
    })
  } else if (node.internal.type === "OrcidWork") {
    const summary = node["work-summary"][0]
    const paperId = createNodeId(
      summary.title.title.value.toLowerCase().trim().replace(/\s+/g, " ")
    )
    let paperNode = getNode(paperId)
    // we always write over the scholar entry, but we save the children
    let existingChildren = paperNode ? paperNode.children : []
    existingChildren = existingChildren.map(childId => getNode(childId))
    // existing journal in case orcid does not have one
    let existingJournal = paperNode ? paperNode.journal : null
    // existing authors, because orcid does not provide them
    let existingAuthors = paperNode ? paperNode.authors : null
    // sometimes the month is not set
    const month = summary["publication-date"].month
      ? parseInt(summary["publication-date"].month.value)
      : paperNode
      ? paperNode.date.month
      : 13
    createNode({
      id: paperId,
      title: summary.title.title.value,
      journal: node["journal-title"]
        ? node["journal-title"].value
        : existingJournal,
      authors: existingAuthors,
      creator: "orcid",
      date: {
        month,
        year: parseInt(summary["publication-date"].year.value),
      },
      internal: {
        type: "Paper",
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })
    // add children again
    existingChildren.forEach(child => {
      delete child.internal.owner
      createNode(child)
      createParentChildLink({ parent: paperNode, child: child })
    })
    // since we don't know when the paper has been created, load the correct
    // paper node for relation
    paperNode = getNode(paperId)
    node["external-ids"]["external-id"].forEach(externalId => {
      if (
        !externalId["external-id-url"] ||
        !externalId["external-id-url"].value
      ) {
        return
      }
      const url = cleanUrl(externalId["external-id-url"].value)
      const paperLink = {
        id: createNodeId(url),
        url: url,
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
