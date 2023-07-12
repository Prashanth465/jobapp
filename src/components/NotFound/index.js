import "./index.css"

const NotFound = () => {
  return (
    <div className="notfound-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound-image"
      />
      <h1>Page Not Found</h1>
      <h3>We are sorry, the page you requested could not be found.</h3>
    </div>
  )
}

export default NotFound
