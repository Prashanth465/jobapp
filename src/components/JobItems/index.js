import "./index.css"
import { TbStarFilled } from "react-icons/tb"
import { BiCurrentLocation } from "react-icons/bi"
import { BsPersonWorkspace } from "react-icons/bs"
import { Link } from "react-router-dom"

const JobItems = (props) => {
  const { availableJobs } = props
  const { imageUrl, title, rating, location, type, salary, description, id } =
    availableJobs
  return (
    <Link to={`/jobs/${id}`} style={{ textDecoration: "none" }}>
      <li className="available-jobs-list-li">
        <div className="company-namelogo-card">
          <img src={imageUrl} alt={title} className="company-logo" />
          <div className="name-ratings-card">
            <h4 className="job-title-text">{title}</h4>
            <div className="star-ratings-card">
              <TbStarFilled className="star-icon" />
              <h4 className="rating-text">{rating}</h4>
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

        <h4 className="description-heading">Description</h4>
        <p className="description-text">{description}</p>
      </li>
    </Link>
  )
}

export default JobItems
