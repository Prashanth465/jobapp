import "./index.css"
import { Component } from "react"
import { default as Cookies } from "js-cookie"

class Profile extends Component {
  state = { userProfile: {} }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const url = "https://apis.ccbp.in/profile"

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)

    if (response.ok) {
      const profileDetails = {
        imageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        bio: data.profile_details.short_bio,
      }
      this.setState({ userProfile: profileDetails })
    }
  }

  render() {
    const { userProfile } = this.state
    const { imageUrl, name, bio } = userProfile
    return (
      <div className="userprofile-card">
        <img src={imageUrl} alt="logo" />
        <h3>{name}</h3>
        <p>{bio}</p>
      </div>
    )
  }
}

export default Profile
