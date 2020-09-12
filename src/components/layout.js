import React from "react"
import icons from "./icons"

export default function Layout({ children }) {
  return (
    <>
      <nav
        className="mini-navbar container is-desktop border"
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
      <div className="page container is-desktop px-1">
        <div class="content">{children}</div>
        <div class="bio is-size-7">
          <p>
            Hi, I'm Hermann, PhD Student at the Autonomous Systems Lab of ETH
            Z&uuml;rich.
          </p>
          <p>
            My research focuses on robotic perception. I strive to build robots
            that can understand their environment semantically and
            geometrically, in order to perform manipulation and other safety
            critical tasks in proximity to humans.
          </p>
          <p>
            <span
              class="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.github }}
            ></span>
            hermannsblum
          </p>
          <p>
            <span
              class="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.linkedin }}
            ></span>
            hermannsblum
          </p>
          <p>
            <span
              class="icon pr-2"
              dangerouslySetInnerHTML={{ __html: icons.globe }}
            ></span>
            Visit the <a href="https://asl.ethz.ch">ASL website</a> for latest
            updates from my colleagues and supervisors
          </p>
        </div>
      </div>
    </>
  )
}
