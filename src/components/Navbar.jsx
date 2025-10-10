import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">Bon Voyage</Link>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/explore" className="nav-link">Explore</NavLink>
        </nav>
      </div>
    </header>
  )
}
