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
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Vollkorn, Reenie Beanie"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
