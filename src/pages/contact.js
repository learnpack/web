import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import LearnBox from "../components/learn-box"
import SEO from "../components/seo"
import 'react-animated-term/dist/react-animated-term.css'
import Terminal from 'react-animated-term'
import commands from "../utils/terminal-script"
import rigoURL from "../img/rigo.jpg"
import { Twemoji }  from "react-emoji-render"
import render from '../components/icons'

const ContactPage = () => (
    <Layout>
        <div className="contact-container">
            <h2>Contact Us</h2>
            <p>We're building a bunch of awesome products. If you're interested in working with us, or have a burning feature request you want to talk about, then let us know.</p>

        </div>

    </Layout>
)

export default ContactPage