import "./index.css"
import { Link, withRouter } from "react-router-dom"
import { default as Cookies } from "js-cookie"

const Header = (props) => {
  const { history } = props
  const onLogout = () => {
    Cookies.remove("jwt_token")
    // history.replace("/login")
    console.log(history)
  }

  return (
    <div className="header-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo"
      />
      <div className="header-options">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h4>Home</h4>
        </Link>
        <Link to="/jobs" style={{ textDecoration: "none" }}>
          <h4>Jobs</h4>
        </Link>
      </div>
      <button type="button" className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
