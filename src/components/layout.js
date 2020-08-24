import React from "react"
export default function Layout({ children }) {
  return (
    <>
      <nav className="mini-navbar container is-desktop" role="navigation" ariaLabel="main navigation">
        <a className="navbar-item">Home</a>
        <a className="navbar-item">Research</a>
      </nav>
      <div className="page container is-desktop">
        <div class="content">
          {children}
        </div>
        <div class="bio">
          Bio test
        </div>
      </div>
    </>
  )
}
