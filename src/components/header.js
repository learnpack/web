import {Link} from "gatsby"
import React from "react"
import { Twemoji }  from "react-emoji-render"

const Header = () => {
    return <header className="sticky-top navigation">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <Link className="navbar-brand logo" href="index.html">
                <Twemoji text="📦"/> LearnPack
            </Link>
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navigation">
                <i className="ti-align-right h4 text-dark"></i></button>
            <div className="collapse navbar-collapse text-center" id="navigation">
                <ul className="navbar-nav mx-4 align-items-center">
                <li className="nav-item"><Link className="nav-link" to="/quick-start">Quick Start</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/quick-start">Documentation</Link></li>
                </ul>
                <a href="changelog.html" className="btn btn-sm btn-outline-primary ml-lg-4">For Teachers</a>
                <a href="contact.html" className="btn btn-sm btn-primary ml-lg-4">contact</a>
            </div>
            </nav>
        </div>
    </header>
}

export default Header;