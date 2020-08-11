import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import LearnBox from "../components/learn-box"
import SEO from "../components/seo"
import 'react-animated-term/dist/react-animated-term.css'
import Terminal from 'react-animated-term'
import commands from "../utils/terminal-script"
import rigoURL from "../img/rigo.jpg"
import { Twemoji } from "react-emoji-render"
import render from '../components/icons'

const Package = () => (
    <Layout>
        <div className="container">
            {/* Header section */}
            <div className="header">
                <h4>React</h4>
                <p>16.13.1 • Public • Published 5 months ago</p>
            </div>
            <hr />
            <div className="description-container row justify-content-between align-items-center mb-5">
            {/* Package description section - L hand side */}
            <div className="package-description col-lg-7 text-lg-left">
                <h5>React</h5>
                <p>
                    React is a JavaScript library for creating user interfaces.

                    The react package contains only the functionality necessary to define React components. It is typically used together with a React renderer like react-dom for the web, or react-native for the native environments.
                </p>

                <h5>Example Usage</h5>
                <p>
                    <code>
                        var React = require('react');
                    </code>
                </p>
                <h5>Keywords</h5>
                <p>
                    react, react.js, javascript
                </p>
            </div>

            {/* Statistics section - R hand side */}
                <div className="row-sm-4 text-lg-right">
                    <p>test</p>


                </div>
                </div>
        </div>

    </Layout >
)

export default Package