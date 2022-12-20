/* eslint-disable react/no-unused-state */
import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    activeSalaryRange: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    activeEmployment: '',
  }

  componentDidMount() {
    this.getJobItems()
  }

  getJobItems = async () => {
    const jwtToken = Cookies.get('jwt_token')

    // const url = 'https://apis.ccbp.in/jobs'

    const {activeSalaryRange, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=${activeSalaryRange}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()
    // console.log(data)

    const updateData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    //  console.log(updateData)
    this.setState({jobsList: updateData})
  }

  renderSuccess = () => {
    const {jobsList} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-container-row">
          <div className="jobs-filter-container">
            <div className="profile-container">
              <h1> Naveen </h1>

              <p>Full Stack developer</p>
            </div>

            <hr className="hr-line" />
            <div className="filter-container-check">
              <h1 className="check-heading">Type of Employment</h1>

              <div>
                <input
                  type="checkbox"
                  id="full"
                  name="Employment"
                  value="Full Time"
                />
                <label htmlFor="full">Full Time</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="part"
                  name="Employment"
                  value="Part Time"
                />
                <label htmlFor="part">Part Time</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="freelance"
                  name="Employment"
                  value="Freelance"
                />
                <label htmlFor="freelance">Freelance</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="intern"
                  name="Employment"
                  value="Internship"
                />
                <label htmlFor="intern">Internship</label>
              </div>
            </div>
            <hr className="hr-line" />

            <div className="filter-container-check">
              <h1> Salary Range</h1>
              <form>
                <div>
                  <input type="radio" id="10lpa" name="salary" value="10" />
                  <label htmlFor="10lpa"> 10 LPA and above </label>
                </div>

                <div>
                  <input type="radio" id="20lpa" name="salary" value="20" />
                  <label htmlFor="20lpa"> 20 LPA and above </label>
                </div>
                <div>
                  <input type="radio" id="30lpa" name="salary" value="30" />
                  <label htmlFor="30lpa"> 30 LPA and above </label>
                </div>

                <div>
                  <input type="radio" id="40lpa" name="salary" value="40" />
                  <label htmlFor="40lpa"> 40 LPA and above </label>
                </div>
              </form>
            </div>
          </div>

          <div className="jobs-display-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-bar"
              />
              <button type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>

            <ul className="jobs-container">
              {jobsList.map(each => (
                <JobCard key={each.id} jobItem={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <Link to="/">
        <button type="button" className="find-button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderNotFound = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs.Try another filter. </p>
    </div>
  )

  changeSalary = salaryRangeId => {
    this.setState({salaryRangeId}, this.getJobItems)
  }

  render() {
    const {jobsList} = this.state

    console.log(jobsList)

    return (
      <div className="jobs-bg-container">
        {this.renderSuccess()}
        {this.renderFailure()}
        {this.renderNotFound()}
      </div>
    )
  }
}

export default Jobs
