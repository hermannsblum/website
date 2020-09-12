import React from "react"

function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

export default function Paper({ data }) {
  // build a short conference summary string from the available data
  let conference_summary = `${data.date.year}`
  // search for conference abbreviation
  if (data.journal) {
    if (data.journal.includes("IROS")) {
      conference_summary = `IROS ${data.date.year}`
    } else if (data.journal.includes(`${data.date.year}`)) {
      conference_summary = data.journal
    } else {
      conference_summary = `${data.journal} ${data.date.year}`
    }
  }
  let media_content = ""
  let links = []
  if (data.media) {
    media_content = (
      <figure class="image is-16by9">
        <img src={data.media} class="mx-2"></img>
      </figure>
    )
  }
  data.children.map(link => {
    if (
      link.internal.type === "uri" &&
      link.url &&
      (link.url.includes("youtube") || link.url.includes("youtu.be"))
    ) {
      media_content = (
        <figure class="image is-16by9">
          <iframe
            class="has-ratio mx-2"
            width="360"
            height="180"
            src={`https://www.youtube-nocookie.com/embed/${youtube_parser(
              link.url
            )}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </figure>
      )
    } else if (link.url) {
      const {
        internal: { type },
      } = link
      links.push((
        <>
          <div class="mx-2" style={{fontSize: "0.6rem", lineHeight: "0.4rem"}}>{type}</div>
          <a href={link.url} class="mx-2">
            {`${type === "uri" ? link.url.slice(8, link.url.length) : link.url.split("/").pop()}`}
          </a>
        </>
      ))
    }
  })
  return (
    <div class="mb-5">
      <div class="is-size-7 px-2 has-text-weight-semibold">
        <span class="mx-1 paperhighlight">{conference_summary}</span>
      </div>
      <div class="px-2">
        <div class="mx-2 papertitle">{`${data.title}`}</div>
        {data.authors ? <div class="mx-2 is-size-7">{data.authors}</div> : ""}
      </div>
      {media_content ? (
        <div class="columns is-mobile" style={{ margin: 0 }}>
          <div class="px-2 column is-half pt-1">{media_content}</div>
          <div class="column is-half pt-1">
            <div class="columns is-multiline is-mobile is-size-7">
              {links.map(link => (
                <div class="column is-half-desktop is-full-mobile px-2 paperlink">
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div class="column pt-1">
          <div class="columns is-multiline is-mobile is-size-7">
            {links.map(link => (
              <div class="column is-one-quarter-desktop is-half-mobile px-2 paperlink">
                {link}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
