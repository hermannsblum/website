import React from "react"
import Layout from "../components/layout"
import Paper from "../components/paper"
import { graphql } from "gatsby"
import "./styles.scss"

export const query = graphql`
  query PaperQuery {
    allPaper(sort: { fields: [date___year, date___month], order: [DESC, DESC] }) {
      nodes {
        id
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
          month
        }
      }
    }
    allPapersYaml {
      nodes {
        title
        media
        comment
        journal
        ignore
        authors
      }
    }
  }
`

const WorkPage = ({ data }) => {
  // overwrite paper data with any info from yaml
  const paperData = data.allPaper.nodes.reduce((result, paper) => {
    const correspondingYamlPaper = data.allPapersYaml.nodes.find(
      yamlPaper => yamlPaper.title === paper.title
    )
    if (correspondingYamlPaper) {
      if (!correspondingYamlPaper.ignore) {
        result.push({
          ...paper,
          authors: correspondingYamlPaper.authors || paper.authors,
          media: correspondingYamlPaper.media || paper.media,
          journal: correspondingYamlPaper.journal || paper.journal,
          comment: correspondingYamlPaper.comment,
        })
      }
    } else {
      result.push(paper)
    }
    return result
  }, [])
  return (
    <Layout>
      {paperData.map(paper => (
        <Paper data={paper} key={paper.id}></Paper>
      ))}
    </Layout>
  )
}
export default WorkPage
