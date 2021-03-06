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
    if (
      data.journal.includes("IROS") ||
      data.journal.includes("International Conference on Intelligent Robots")
    ) {
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
      <figure className="image is-16by9">
        <img src={data.media} loading="lazy" alt="paper figure"></img>
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
        <figure className="image is-16by9">
          <iframe
            className="has-ratio"
            width="360"
            height="180"
            src={`https://www.youtube-nocookie.com/embed/${youtube_parser(
              link.url
            )}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </figure>
      )
    } else if (link.url) {
      const {
        internal: { type },
      } = link
      links.push(
        <div className="paperlink">
          <a href={link.url}>
              {`${type === "uri" ? link.url.slice(8, 60) : type}`}
          </a>
        </div>
      )
    }
  })

  const paperinfo = (
    <>
      <div className="papertitle">{`${data.title}`}</div>
      {data.authors ? <div className="is-size-7">{data.authors}</div> : ""}
      <div className="is-size-7" style={{ overflow: "hidden" }}>
        <div className="paperhighlight">{conference_summary}</div>
        {links.map(link => (
          <>{link}</>
        ))}
      </div>
    </>
  )
  return (
    <div className={"columns is-multiline" + (media_content ? " highlighted" : "")}>
      <div
        className={
          (media_content
            ? "pb-0 is-8 is-offset-2 is-hidden-widescreen"
            : "is-2 is-offset-1") +
          " papercomment column is-hidden-mobile"
        }
        style={{ textAlign: "right" }}
      >
        {`${data.comment || ""}`}
      </div>
      {media_content ? (
        <div className="column is-2 is-hidden-widescreen is-hidden-mobile"></div>
      ) : (
        ""
      )}
      <div
        className={"column is-full-mobile" + (media_content ? " is-offset-2" : "")}
      >
        {data.comment ? (
          <div
            className={
              "papercomment" +
              (media_content
                ? " is-hidden-tablet-only is-hidden-desktop-only"
                : " is-hidden-tablet")
            }
          >
            {data.comment}
          </div>
        ) : (
          ""
        )}
        {paperinfo}
      </div>
      {media_content ? <div className="media-content column">{media_content}</div> : ""}
      <div
        className={"column is-hidden-mobile" + (media_content ? " is-2" : " is-3")}
      ></div>
    </div>
  )
}
