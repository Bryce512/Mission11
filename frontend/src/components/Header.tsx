import "../css/header.css";

function Header () {
  return (
    <div className="header">
      <h1>ShoeWater Bookstore</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;