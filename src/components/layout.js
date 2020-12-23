import React from "react"
import icons from "./icons"

export default function Layout({ children }) {
  return (
    <>
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
            <a className="navbar-item">Home</a>
            <a className="navbar-item">Research</a>
          </nav>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6 is-offset-3 is-size-7">
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
          <p class="mt-2">
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
            updates from my colleagues and supervisors
          </p>
        </div>
      </div>
      {children}
    </>
  )
}
