import React from "react"
import Layout from "../components/layout"
import Paper from "../components/paper"
import { graphql } from "gatsby"
import "./styles.scss"

export const query = graphql`
  query PaperQuery {
    allPaper(sort: { fields: date___year, order: DESC }) {
      nodes {
        children {
          internal {
            type
          }
          ... on uri {
            url
          }
          ... on arxiv {
            url
          }
          ... on doi {
            url
          }
        }
        title
        journal
        authors
        date {
          year
        }
      }
    }
    allPapersYaml {
      nodes {
        title
        media
      }
    }
  }
`

const WorkPage = ({ data }) => {
  // overwrite paper data with any info from yaml
  const paperData = data.allPaper.nodes.map(paper => {
    const correspondingYamlPaper = data.allPapersYaml.nodes.find(yamlPaper => yamlPaper.title === paper.title)
    if (correspondingYamlPaper) {
      return {
        ...paper,
        authors: correspondingYamlPaper.authors || paper.authors,
        media: correspondingYamlPaper.media || paper.media,
      }
    }
    return paper
  })
  return (
    <Layout>
      {paperData.map(paper => (
        <Paper data={paper}></Paper>
      ))}
    </Layout>
  )
}
export default WorkPage
