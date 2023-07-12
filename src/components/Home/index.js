import "./index.css"
import Header from "../Header"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-bg">
        <div className="home-content-card">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <h3 className="home-description">
            Millions of people are searching for jobs,salary information,company
            reviews. Find the job that fits your abilities and potential.
          </h3>
          <Link to="/jobs">
            <button className="find-jobs-btn">Find Jobs</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
