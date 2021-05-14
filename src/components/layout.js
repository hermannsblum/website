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
      <div class="columns">
        <div class="column is-6 is-offset-3 is-desktop">
          <nav
            className="mini-navbar border"
            role="navigation"
            ariaLabel="main navigation"
          >
            <span
              class="pl-1 pt-2"
              style={{
                height: "3rem",
                marginRight: "auto",
              }}
              dangerouslySetInnerHTML={{ __html: icons.pushbot }}
            ></span>
            <a className="navbar-item" href="/">
              Home
            </a>
          </nav>
        </div>
      </div>
      <div class="columns is-mobile">
        <div
          class="decoration"
          style={{
            height: "10rem",
            width: "5rem",
            top: "20rem",
            left: "7%",
            transform: "rotate(-11deg)",
          }}
        >
          <img src="/robo3.svg" alt=""></img>
        </div>
        <div
          class="decoration"
          style={{
            height: "10rem",
            width: "7rem",
            top: "1rem",
            left: "80%",
            //transform: "rotate(7deg)",
          }}
        >
          <img src="/robo2.svg" alt=""></img>
        </div>
        <div
          class="decoration"
          style={{
            height: "10rem",
            width: "4rem",
            top: "15rem",
            left: "calc(80% + 5rem)",
            transform: "rotate(7deg)",
          }}
        >
          <img src="/robo1.svg" alt=""></img>
        </div>
        <div 
	  class="column is-2-tablet is-offset-3-tablet is-3-mobile"
	  style={{
            'max-height': '10rem',
	    overflow: 'hidden',
          }}
	>
          <img src="/profile.svg" alt="profile picture"></img>
        </div>
        <div class="column is-4-tablet is-9-mobile is-size-7">
          <p>
            Hi, I'm Hermann. I work as a PhD Student at the Autonomous Systems
            Lab of ETH Z&uuml;rich.
          </p>
          <p class="mt-2">
            My research focuses on robotic perception. I strive to build robots
            that can understand their environment semantically and
            geometrically, in order to perform manipulation and other safety
            critical tasks in proximity to humans.
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-7 is-offset-3 is-size-7">
          <p>
            <span
              class="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.github }}
            ></span>
            <span class="icontext">hermannsblum</span>
          </p>
          <p>
            <span
              class="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.linkedin }}
            ></span>
            <span class="icontext">hermannsblum</span>
          </p>
          <p class="mt-2">
            Visit the <a href="https://asl.ethz.ch">ASL website</a> for latest
            updates from my colleagues and supervisors.
          </p>
          <p class="mt-2">Here are my recent works:</p>
        </div>
      </div>
      {children}
      <div class="columns">
        <div class="column is-7 is-offset-3 is-size-7">
          <p>
            Thanks to&nbsp;
            <a href="http://www.freepik.com">0melapics / Freepik</a>
            &nbsp;for the robot decorations.
          </p>
        </div>
      </div>
    </>
  )
}
