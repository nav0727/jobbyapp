/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unused-state */
// eslint-disable-next-line
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobCard from '../JobCard'

import Filter from '../Filter'

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
    activeSalaryRange: '',
    searchInput: '',

    apiResStatus: apiConstStatus.initial,
    categoryList: '',
  }

  componentDidMount() {
    this.getJobItems()
    this.getProfile()
  }

  renderSuccess = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(each => (
          <JobCard key={each.id} jobItem={each} />
        ))}
      </ul>
    )
  }

  renderNotFound = () => (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="not-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs.Try another filter. </p>
    </div>
  )

  changeSalary = event => {
    this.setState({activeSalaryRange: event.target.value}, this.getJobItems)
  }

  getJobItems = async () => {
    this.setState({apiResStatus: apiConstStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    // const url = 'https://apis.ccbp.in/jobs'

    const {activeSalaryRange, searchInput, categoryList} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${categoryList}&minimum_package=${activeSalaryRange}&search=${searchInput}`

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
      <div className="profile-container">
        <img src={profileAvatar} alt="profile Avatar" />
        <h1>{name}</h1>
        <p>{ShortBio}</p>
      </div>
    )
  }

  profileFail = () =>
    this.setState({apiResStatus: apiConstStatus.inProgress}, this.getJobItems)

  renderProfileFailure = () => (
    <button className="find-button" type="button" onClick={this.profileFail}>
      Retry
    </button>
  )

  renderProfileDetail = () => {
    const {apiResStatus} = this.state
    switch (apiResStatus) {
      case apiConstStatus.success:
        return this.renderProfile()
      case apiConstStatus.failure:
        return this.renderProfileFailure()
      case apiConstStatus.inProgress:
        return this.renderProgress()
      default:
        return null
    }
  }

  search = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBtn = () => {
    this.getJobItems()
  }

  onSearch = event => {
    if (event.target.value === 'Enter') {
      this.getJobItems()
    }
  }

  onChangeSalary = salaryRangeId => {
    this.setState({activeSalaryRange: salaryRangeId}, this.getJobItems)
  }

  onChangeEmploy = employmentTypeId => {
    this.setState({categoryList: employmentTypeId}, this.getJobItems)
  }

  renderJobs = () => {
    const {searchInput, jobsList} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-container-row">
          <div className="jobs-filter-container">
            <div>{this.renderProfileDetail()}</div>

            <hr className="hr-line" />

            <Filter
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeSalary={this.onChangeSalary}
              onChangeEmploy={this.onChangeEmploy}
            />
          </div>

          <div className="jobs-display-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-bar"
                onChange={this.search}
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-container">
              {jobsList.length > 0
                ? this.renderAllJobs()
                : this.renderNotFound()}
            </div>
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

      <button type="button" className="find-button" onClick={this.onSearchBtn}>
        Retry
      </button>
    </div>
  )

  renderProgress = () => (
    // testid="loader"
    // <Loader type="Circles" color="blue" height="50" width="50" />
    //   <Loader type="Ball-Triangle" color="green" height="50" width="50" />
    <div className="loader-container" testid="loader">
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
