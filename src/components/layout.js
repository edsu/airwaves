import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import SiteMetadata from "./site-metadata"
import "./layout.css"

const Layout = ({ children, feedUrl, title}) => {
  return (
    <>
      <Header />
      <SiteMetadata feedUrl={feedUrl} title={title} />
      <main className="content">
        {children}
      </main>
      <Footer />
    </>
  )

}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
