import React from "react"
import ReactPlayer from "react-player/lazy"

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
    } else if (data.journal.includes("ISARC")) {
      conference_summary = `ISARC ${data.date.year}`
    } else if (data.journal.includes(`${data.date.year}`)) {
      conference_summary = data.journal
    } else {
      conference_summary = `${data.journal} ${data.date.year}`
    }
  }
  let media_content = ""
  let links = []
  if (data.media) {
    if (data.media.endsWith("mov")) {
      media_content = (
        <figure className="image is-16by9">
          <ReactPlayer
            url={data.media}
            light={true}
            controls={true}
            width="100%"
            height="100%"
            className="react-player"
            config={{ file: { forceVideo: true } }}
          />
        </figure>
      )
    } else {
      media_content = (
        <figure className="image is-16by9">
          <img src={data.media} loading="lazy" alt="paper figure"></img>
        </figure>
      )
    }
  }
  data.children.map(link => {
    if (
      link.internal.type === "uri" &&
      link.url &&
      (link.url.includes("youtube") || link.url.includes("youtu.be"))
    ) {
      media_content = (
        <figure className="image is-16by9">
          <ReactPlayer
            url={link.url}
            light={true}
            controls={true}
            width="100%"
            height="100%"
            className="react-player"
          />
        </figure>
      )
    } else if (link.url) {
      const {
        internal: { type },
      } = link
      let linkText = type
      if (type === "uri") {
        if (link.url.includes("github")) {
          linkText = "code"
        } else {
          const url = new URL(link.url)
          linkText = url.hostname
        }
      }
      links.push(
        <div className="paperlink" key={link.url}>
          <a href={link.url}>{linkText}</a>
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
    <div
      className={"columns is-multiline" + (media_content ? " highlighted" : "")}
    >
      <div className="is-2 is-offset-1-desktop papercomment column is-hidden-mobile">
        {`${data.comment || ""}`}
      </div>
      <div className="column is-full-mobile">
        {paperinfo}
        {data.comment ? (
          <div className="papercomment is-hidden-tablet">{data.comment}</div>
        ) : (
          ""
        )}
      </div>
      {media_content ? (
        <div className="media-content column">{media_content}</div>
      ) : (
        ""
      )}
      <div className="column is-hidden-mobile is-3-desktop is-2-tablet"></div>
    </div>
  )
}
