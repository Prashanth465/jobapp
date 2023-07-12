import "./index.css"

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
]

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
]

const FilterJobs = (props) => {
  const { filterByType, filterBySalary, currentSalary } = props

  const onFilterType = (event) => filterByType(event)

  const onFilterSalary = (event) => filterBySalary(event)
  return (
    <div className="filter-list-container">
      <h3 className="filter-heading">Types of Employment</h3>
      <ul className="filter-type-card">
        {employmentTypesList.map((eachList) => (
          <li>
            <input
              type="checkbox"
              className="checkbox"
              id={eachList.employmentTypeId}
              onChange={onFilterType}
            />
            <label for={eachList.employmentTypeId}>{eachList.label}</label>
          </li>
        ))}
      </ul>

      <h3 className="filter-heading">Salary Range</h3>
      <ul className="filter-type-card">
        {salaryRangesList.map((eachList) => (
          <li>
            <input
              type="checkbox"
              className="checkbox"
              id={eachList.salaryRangeId}
              onChange={onFilterSalary}
              checked={currentSalary === eachList.salaryRangeId}
            />
            <label for={eachList.salaryRangeId}>{eachList.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterJobs
