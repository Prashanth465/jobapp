import "./index.css"
import { Component } from "react"
import Header from "../Header"
import { default as Cookies } from "js-cookie"
import { TbStarFilled } from "react-icons/tb"
import { BiCurrentLocation } from "react-icons/bi"
import { BsPersonWorkspace } from "react-icons/bs"
import { Puff as Loader } from "react-loader-spinner"
import SimilarJobs from "../SimilarJobs"

const apiStatusTracker = {
  success: "SUCCESS",
  failure: "FAILURE",
  progess: "PROGRESS",
  initial: "INITIAL",
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    apiStatus: apiStatusTracker.initial,
    similarJobInfo: [],
  }

  componentDidMount() {
    this.displayJobDetails()
  }

  showJobDetails = (data) => {
    const fethcedDetails = {
      id: data.job_details.id,
      imageUrl: data.job_details.company_logo_url,
      title: data.job_details.title,
      rating: data.job_details.rating,
      location: data.location,
      type: data.job_details.employment_type,
      salary: data.job_details.package_per_annum,
      description: data.job_details.job_description,
      skills: data.job_details.skills.map((each) => ({
        name: each.name,
        imageUrl: each.image_url,
      })),
      workLife: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
    }

    const similarJobLists = data.similar_jobs.map((each) => ({
      logoUrl: each.company_logo_url,
      jobType: each.employment_type,
      description: each.job_description,
      location: each.location,
      title: each.title,
      rating: each.rating,
    }))
    this.setState({
      jobDetails: fethcedDetails,
      apiStatus: apiStatusTracker.success,
      similarJobInfo: similarJobLists,
    })
    console.log(this.state)
  }

  displayJobDetails = async () => {
    this.setState({ apiStatus: apiStatusTracker.progess })

    const { history } = this.props

    const url = `https://apis.ccbp.in${history.location.pathname}`
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
      this.showJobDetails(data)
    } else {
      this.setState({ apiStatus: apiStatusTracker.failure })
    }
  }

  renderLoadingView = () => (
    <div className="loader-card-jobs">
      <Loader />
    </div>
  )

  renderSuccessView = () => {
    const { jobDetails } = this.state
    const {
      imageUrl,
      title,
      rating,
      location,
      type,
      salary,
      description,
      skills,
      workLife,
    } = jobDetails
    return (
      <div className="available-jobs-list-li">
        <div className="company-namelogo-card">
          <img src={imageUrl} alt={title} className="company-logo" />
          <div className="name-ratings-card">
            <h3 className="job-title-text">{title}</h3>
            <div className="star-ratings-card">
              <TbStarFilled className="star-icon" />
              <h3 className="rating-text">{rating}</h3>
            </div>
          </div>
        </div>

        <div className="location-type-salary-card">
          <div className="location-type">
            <BiCurrentLocation className="location-icon" />
            <p className="location-text">{location}</p>
            <BsPersonWorkspace className="work-icon" />
            <p>{type}</p>
          </div>
          <h5>{salary}</h5>
        </div>

        <h3 className="description-heading">Description</h3>
        <p className="description-text">{description}</p>

        <h3>Skills</h3>
        <ul className="skills-card">
          {skills?.map((each) => (
            <li className="skills-list-li">
              <img src={each.imageUrl} alt={title} />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>

        <h3>Life at Company</h3>
        <div className="life-at-card">
          <p className="life-at-text">{workLife?.description}</p>
          <img src={workLife?.imageUrl} alt={title} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="not found"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusTracker.success:
        return this.renderSuccessView()
      case apiStatusTracker.progress:
        return this.renderLoadingView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    // console.log(skills)
    const { similarJobInfo } = this.state
    return (
      <>
        <Header />
        <div className="job-details-bg">
          {this.renderSwitch()}
          <h2 style={{ color: "white" }}>Similar Jobs</h2>
          <ul className="similar-jobs-cardul">
            {similarJobInfo.map((each) => (
              <SimilarJobs jobInfo={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default JobDetails
