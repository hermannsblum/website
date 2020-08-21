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
  ],
}
