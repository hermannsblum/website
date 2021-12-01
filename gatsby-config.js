/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-source-orcid",
    {
      resolve: `gatsby-source-google-scholar`,
      options: {
        queries: [`hermann blum`],
      },
    },
    "gatsby-transformer-paper",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-google-scholar-profile",
      options: {
        queries: ["2Pxx8QIAAAAJ"],
      },
    },
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/data/",
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-simple-analytics",
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
      },
    },
    //"gatsby-plugin-no-javascript",
  ],
}
