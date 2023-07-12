import { Component } from "react"
import "./index.css"
import Cookies from "js-cookie"

class Login extends Component {
  state = { username: "", password: "", error: false, errMessage: "" }

  onEnterUserName = (event) => this.setState({ username: event.target.value })

  onEnterPassword = (event) => this.setState({ password: event.target.value })

  onUserLogin = async (event) => {
    event.preventDefault()

    const { username, password } = this.state
    const userInfo = { username, password }

    const url = "https://apis.ccbp.in/login"

    const options = {
      method: "POST",
      body: JSON.stringify(userInfo),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)

    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set("jwt_token", jwtToken, { expires: 40 })
    } else {
      this.setState({ error: true, errMessage: data.error_msg })
    }
  }

  render() {
    const { error, errMessage } = this.state
    return (
      <div className="login-bg">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form onClick={this.onUserLogin}>
            <label>USERNAME</label>
            <input
              type="text"
              placeholder="Username"
              onChange={this.onEnterUserName}
            />
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="Password"
              onChange={this.onEnterPassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {error && <p className="error-message">{errMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
