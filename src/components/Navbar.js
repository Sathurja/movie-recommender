
import React from "react"
import logo from "../images/logo.png"
import {NavLink} from "react-router-dom"
//import headerStyle from "../style/header-style.css"

export default function Navbar() {
    return (
        <nav className="header">
            <img src={logo} className="header--logo" />
            <h3 className="header--title">Movie Picker</h3>
            <ul className="header--list">
                <li className="header--items">
                    <NavLink to="/about" className="header--item">About</NavLink>
                </li>
                <li className="header--items">
                    <NavLink to="/" className="header--item">Try it Out</NavLink>
                </li>
            </ul>
        </nav>
    )
}