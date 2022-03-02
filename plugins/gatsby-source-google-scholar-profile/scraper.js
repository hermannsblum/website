'use strict'

// code copied and refactored from https://github.com/VT-CHCI/google-scholar
// for usage limits see https://developers.google.com/webmaster-tools/search-console-api-original/v3/limits

const request = require('request')
const cheerio = require('cheerio')
var iconv = require("iconv-lite")

const processResults = require('./processor')

const resultsPerPage = 10
const googleScholarUrl = 'https://scholar.google.com/scholar?hl=en&q='
const scholarUrl = 'https://scholar.google.com'

const statusCodeForRateLimit = 503
const statusMessageForRateLimit = 'Service Unavailable'
const statusMessageBody = `
  This page appears when Google automatically detects requests
  coming from your computer network which appear to be in violation
  of the <a href="//www.google.com/policies/terms/">Terms of Service</a>.
  The block will expire shortly after those requests stop.
`

// regex with thanks to http://stackoverflow.com/a/5917250/1449799
const resultCountRegex = /\W*((\d+|\d{1,3}(,\d{3})*)(\.\d+)?) results/

const scholarResultsCallback = (resolve, reject) => (error, response, body) => {
  if (error) return reject(error)
  if (response.statusCode !== 200) {
    if (
      response.statusCode === statusCodeForRateLimit &&
      response.statusMessage === statusMessageForRateLimit &&
      response.body.includes(statusMessageBody)
    ) {
      return reject(
        new Error(`
          You have made too many requests too quickly and are being rate-limited
          by Google Scholar. See: https://support.google.com/websearch/answer/86640.
          You might try to visit scholar.google.com and solve a captcha to unblock your IP
          or use a VPN.
        `)
      )
    } else {
      return reject(
        new Error(
          `Expected status code 200 on Google Scholar http response, but got ${
            response.statusCode
          }.`
        )
      )
    }
  }
  // decode body
  var decodedBody = iconv.decode(body, "iso-8859-1")
  const html = cheerio.load(decodedBody)
  const results = html('.gsc_a_tr')
  if (!results.length)
    return reject(
      new Error(`
        Your Google Scholar query returned no results. Google may
        be rate-limiting your requests. You may try to visit
        scholar.google.com and solve a captcha to unblock your IP or use a VPN.
      `)
    )

  resolve({
    results: processResults(html, results),
    count: results.length,
  })
}

const search = query =>
  new Promise((resolve, reject) => {
    const requestOptions = {
      //url: encodeURI(googleScholarUrl + query),
      url:
        "https://scholar.google.com/citations?user=2Pxx8QIAAAAJ&hl=en&view_op=list_works&sortby=pubdate",
      jar: true, // remember cookies for future use
      encoding: null,
    }
    request(requestOptions, scholarResultsCallback(resolve, reject))
  })

const all = query =>
  search(query).then(results => {
    return results
  })

module.exports = { search, all }
