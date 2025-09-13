import React from 'react'
import { NavLink } from 'react-router-dom'


export default function SecondNavbar() {
return (
<nav id="secondNavbar" className="px-3">
<ul className="m-0 p-0 d-flex gap-4 list-unstyled">
<li><NavLink to="/" end>Home</NavLink></li>
<li><NavLink to="/cars">Cars</NavLink></li>
<li><NavLink to="/suppliers">Suppliers</NavLink></li>
</ul>
</nav>
)
}