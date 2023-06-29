import React from "react"
import { Helmet } from "react-helmet"
import icons from "./icons"

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hermann Blum</title>
        <link rel="icon" sizes="any" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="columns">
        <div className="column is-8-tablet is-6-desktop is-offset-3-desktop is-offset-2-tablet is-desktop">
          <nav
            className="mini-navbar border"
            role="navigation"
            aria-label="main navigation"
          >
            <span
              className="pl-1 pt-2"
              style={{
                height: "3rem",
                marginRight: "auto",
              }}
              dangerouslySetInnerHTML={{ __html: icons.pushbot }}
            ></span>
            <a
              className="navbar-item"
              rel="noreferrer"
              href="https://boardgames.hermannblum.net/"
              target="_blank"
            >
              Boardgames
            </a>
            <a className="navbar-item" href="/">
              Home
            </a>
          </nav>
        </div>
      </div>
      <div className="columns">
        <div
          className="decoration"
          style={{
            height: "10rem",
            width: "5rem",
            top: "20rem",
            left: "7%",
            transform: "rotate(-11deg)",
          }}
        >
          <img src="/robo3.svg" alt="" loading="lazy"></img>
        </div>
        <div
          className="decoration"
          style={{
            height: "10rem",
            width: "7rem",
            top: "1rem",
            left: "80%",
            //transform: "rotate(7deg)",
          }}
        >
          <img src="/robo2.svg" alt="" loading="lazy"></img>
        </div>
        <div
          className="decoration"
          style={{
            height: "10rem",
            width: "4rem",
            top: "15rem",
            left: "calc(80% + 5rem)",
            transform: "rotate(7deg)",
          }}
        >
          <img src="/robo1.svg" alt="" loading="lazy"></img>
        </div>
        <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet is-size-7">
          <div className="columns is-mobile">
            <div
              className="column is-3"
              style={{
                maxHeight: "10rem",
                overflow: "hidden",
              }}
            >
              <img src="/profile.png" alt="profile picture"></img>
            </div>
            <div className="column">
              <p>
                Hi, I'm Hermann. I work as a PostDoc in the Computer Vision and
                Geometry Lab of ETH Z&uuml;rich. For my PhD I was part of the
                Autonomous Systems Lab at ETH Z&uuml;rich.
              </p>
              <p className="mt-2">
                My research focuses on robotic perception. I strive to build
                robots that can understand their environment semantically and
                geometrically, in order to perform manipulation and other safety
                critical tasks in proximity to humans.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet is-size-7">
          <span>
            <span
              className="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.github }}
            ></span>
            <a
              className="icontext"
              href="https://github.com/hermannsblum"
              rel="noreferrer"
              target="_blank"
            >
              hermannsblum
            </a>
          </span>
          <span>
            <span
              className="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.linkedin }}
            ></span>
            <a
              className="icontext"
              href="https://www.linkedin.com/in/hermann-bl/"
              rel="noreferrer"
              target="_blank"
            >
              hermannsblum
            </a>
          </span>
          <span>
            <span
              className="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.mastodon }}
            ></span>
            <a
              className="icontext"
              href="https://sigmoid.social/@hermann"
              rel="noreferrer"
              target="_blank"
            >
              @hermann@sigmoid.social
            </a>
          </span>
          <p className="mt-2">
            Visit the <a href="https://cvg.ethz.ch">CVG website</a> for
            available student projects and latest updates from my colleagues.
          </p>
          <p className="mt-2">Here are my recent works:</p>
        </div>
      </div>
      {children}
      <div className="columns">
        <div className="column is-7 is-offset-3 is-size-7">
          <p>
            Thanks to&nbsp;
            <a href="http://www.freepik.com">0melapics / Freepik</a>
            &nbsp;for the robot decorations.
          </p>
          <p>
            This website has a{" "}
            <a
              href="https://www.websitecarbon.com/website/hermannblum-net/"
              target="_blank"
              rel="noreferrer"
            >
              low carbon footprint
            </a>{" "}
            and is hosted on green energy.
          </p>
        </div>
      </div>
    </>
  )
}
