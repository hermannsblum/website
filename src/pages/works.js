import React from "react"
import Layout from "../components/layout"
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
        }
        title
        date {
          year
        }
      }
    }
  }
`

const WorkPage = ({ data }) => (
  <Layout>
    {data.allPaper.nodes.map(paper => (
      <div class="container">{`${paper.date.year}: ${paper.title}`}</div>
    ))}
  </Layout>
)
export default WorkPage
