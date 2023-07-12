import "./index.css"
import { Component } from "react"
import Header from "../Header"
import Profile from "../Profile"
import JobItems from "../JobItems"
import FilterJobs from "../FilterJobs"
import { AiOutlineFileSearch } from "react-icons/ai"
import { default as Cookies } from "js-cookie"
import { Puff as Loader } from "react-loader-spinner"

const apiStatusTracker = {
  success: "SUCCESS",
  failure: "FAILURE",
  progress: "PROGRESS",
  initial: "INITIAL",
}

class Jobs extends Component {
  state = {
    availableJobs: [],
    apiStatus: apiStatusTracker.initial,
    searchInput: "",
    employment: [],
    salary: "",
  }

  getSearchValue = (event) => {
    this.setState({ searchInput: event.target.value })
    this.displayJobs()
  }

  componentDidMount() {
    this.displayJobs()
  }

  showAllJobs = (data) => {
    const fethcedJobs = data.jobs.map((each) => ({
      id: each.id,
      imageUrl: each.company_logo_url,
      title: each.title,
      rating: each.rating,
      location: each.location,
      type: each.employment_type,
      salary: each.package_per_annum,
      description: each.job_description,
    }))
    this.setState({
      availableJobs: fethcedJobs,
      apiStatus: apiStatusTracker.success,
    })
  }

  displayJobs = async () => {
    const { employment, salary, searchInput } = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    }

    this.setState({ apiStatus: apiStatusTracker.progress })

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)

    if (response.ok) {
      this.showAllJobs(data)
    } else {
      this.setState({ apiStatus: apiStatusTracker.failure })
    }
  }

  renderJobsView = () => {
    const { availableJobs } = this.state

    return (
      <>
        {availableJobs.length !== 0 && (
          <ul className="available-jobs-card-ul">
            {availableJobs.map((each) => (
              <JobItems availableJobs={each} key={each.id} />
            ))}
          </ul>
        )}
        {availableJobs.length === 0 && this.renderNoJobsView()}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-card-jobs">
      <Loader />
    </div>
  )

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

  renderNoJobsView = () => (
    <div className="failure-view-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="nojobs-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderSwitch = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusTracker.success:
        return this.renderJobsView()
      case apiStatusTracker.progress:
        return this.renderLoadingView()
      default:
        return this.renderFailureView()
    }
  }

  filterByType = (event) => {
    const { employment } = this.state

    if (event.target.checked) {
      this.setState(
        { employment: [...employment, event.target.id] },
        this.displayJobs
      )
    } else {
      this.setState(
        {
          employment: employment.filter((each) => each.id !== event.target.id),
        },
        this.displayJobs
      )
    }
  }

  filterBySalary = (event) =>
    this.setState({ salary: event.target.id }, this.displayJobs)

  render() {
    const { salary } = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg">
          <div className="userprofile-filter-card">
            <Profile />
            <FilterJobs
              filterByType={this.filterByType}
              filterBySalary={this.filterBySalary}
              currentSalary={salary}
            />
          </div>
          <div className="search-showjobs-card">
            <div className="search-card">
              <input
                type="search"
                placeholder="Search"
                className="jobs-search-input"
                onChange={this.getSearchValue}
              />
              <AiOutlineFileSearch />
            </div>

            {this.renderSwitch()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
