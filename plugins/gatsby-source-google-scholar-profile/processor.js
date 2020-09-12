const scholarUrl = 'https://scholar.google.com'

module.exports = processResults = (html, results) => {
  const processedResults = []
  results.each((i, el) => {
    // publication object: will receive title, url, authors (name, url?),
    //   preEtAl, postEtAl, abstract, year, journal?, citedByCount
    //   citedByUrl, relatedUrl, pdfUrl?
    const res = {}
    html(el)
      .find('.gs_ri h3 span')
      .remove()
    res.title = html(el)
      .find('.gsc_a_at')
      .text()
    res.authors = html(el).find(".gs_gray").first().text()
    res.journal = html(el).find(".gs_gray").last().text()
    res.year = html(el).find(".gsc_a_y").text()
    Object.keys(res).forEach(key => {
      if (typeof res[key] === `string`) {
        res[key] = res[key].replace(/&.{4,6};/g, ``)
      }
    })

    processedResults.push(res)
  })
  return processedResults
}
