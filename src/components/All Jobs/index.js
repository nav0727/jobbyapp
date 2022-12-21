/* eslint-disable react/no-unused-state */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobCard from '../JobCard'

import RadioButton from '../RadioButton'

import './index.css'
import CheckBox from '../CheckBox'

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

const apiConstStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileList: [],
    activeSalaryRange: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    activeEmployment: '',
    apiResStatus: apiConstStatus.initial,
  }

  componentDidMount() {
    this.getJobItems()
    this.getProfile()
  }

  renderSuccess = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-container">
        {jobsList.map(each => (
          <JobCard key={each.id} jobItem={each} />
        ))}
      </ul>
    )
  }

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

  getJobItems = async () => {
    this.setState({apiResStatus: apiConstStatus.inProgress})
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
    if (response.ok === true) {
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
      this.setState({
        jobsList: updateData,
        apiResStatus: apiConstStatus.success,
      })
    } else {
      this.setState({apiResStatus: apiConstStatus.failure})
    }
  }

  getProfile = async () => {
    this.setState({apiResStatus: apiConstStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const profile = await response.json()
      console.log(profile)

      const profileList = {
        name: profile.profile_details.name,
        profileAvatar: profile.profile_details.profile_image_url,
        ShortBio: profile.profile_details.short_bio,
      }
      console.log(profileList)
      this.setState({
        profileList,
        apiResStatus: apiConstStatus.success,
      })
    } else {
      this.setState({apiResStatus: apiConstStatus.failure})
    }
  }

  renderProfile = () => {
    const {profileList} = this.state
    const {name, profileAvatar, ShortBio} = profileList
    return (
      <div>
        <img src={profileAvatar} alt="profile Avatar" />
        <h1>{name}</h1>
        <p>{ShortBio}</p>
      </div>
    )
  }

  renderProfileDetail = () => {
    const {apiResStatus} = this.state
    switch (apiResStatus) {
      case apiConstStatus.success:
        return this.renderProfile()
      case apiConstStatus.failure:
        return this.renderFailure()
      case apiConstStatus.inProgress:
        return this.renderProgress()
      default:
        return null
    }
  }

  renderJobs = () => (
    <div className="jobs-bg-container">
      <Header />
      <div className="jobs-container-row">
        <div className="jobs-filter-container">
          <div className="profile-container">{this.renderProfileDetail()}</div>

          <hr className="hr-line" />
          <div className="filter-container-check">
            <h1 className="filter-heading">Type of Employment</h1>
            <ul className="ul-list-con">
              {employmentTypesList.map(each => (
                <CheckBox key={each.id} checkItem={each} />
              ))}
            </ul>
          </div>
          <hr className="hr-line" />

          <div className="filter-container-check">
            <h1 className="filter-heading"> Salary Range</h1>

            <ul className="ul-list-con">
              {salaryRangesList.map(each => (
                <RadioButton key={each.id} radioItem={each} />
              ))}
            </ul>
          </div>
        </div>

        <div className="jobs-display-container">
          <div className="search-container">
            <input type="search" placeholder="Search" className="search-bar" />
            <button type="button" data-testid="searchButton">
              <BsSearch className="search-icon" />
            </button>
          </div>

          {this.renderAllJobs()}
        </div>
      </div>
    </div>
  )

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

  renderProgress = () => (
    // testid="loader"
    // <Loader type="Circles" color="blue" height="50" width="50" />
    //   <Loader type="Ball-Triangle" color="green" height="50" width="50" />
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiResStatus} = this.state
    switch (apiResStatus) {
      case apiConstStatus.success:
        return this.renderSuccess()
      case apiConstStatus.failure:
        return this.renderFailure()
      case apiConstStatus.inProgress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    // console.log(jobsList)

    return <div className="jobs-bg-container">{this.renderJobs()}</div>
  }
}

export default Jobs
