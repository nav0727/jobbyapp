import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {HiLocationMarker} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import {IoBagAdd} from 'react-icons/io5'

import Cookies from 'js-cookie'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarItems'

import './index.css'
import Header from '../Header'

const apiConstStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class SimilarJobs extends Component {
  state = {
    jobsList: [],
    skillsList: [],
    life: [],
    similarJobList: [],
    apiStatus: apiConstStatus.initial,
  }

  componentDidMount() {
    this.getItemData()
  }

  getItemData = async () => {
    this.setState({apiStatus: apiConstStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const itemUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(itemUrl, options)

    if (response.ok === true) {
      const resData = await response.json()

      console.log(resData)

      const jobItem = {
        companyLogoUrl: resData.job_details.company_logo_url,
        companyWebsiteUrl: resData.job_details.company_website_url,
        employmentType: resData.job_details.employment_type,
        id: resData.job_details.id,
        jobDescription: resData.job_details.job_description,
        title: resData.job_details.title,
        packagePerAnnum: resData.job_details.package_per_annum,
        rating: resData.job_details.rating,
        location: resData.job_details.location,
      }
      //  console.log(jobItem)

      const lifeAtCompany = {
        description: resData.job_details.life_at_company.description,
        lifeLogo: resData.job_details.life_at_company.image_url,
      }

      // console.log(lifeAtCompany)

      const skill = resData.job_details.skills.map(each => ({
        name: each.name,
        skillLogo: each.image_url,
      }))
      // console.log(skill)

      const similarJob = resData.similar_jobs.map(each => ({
        simCompanyLogo: each.company_logo_url,
        simEmploy: each.employment_type,
        simId: each.id,
        simJobDesc: each.job_description,
        simLoc: each.location,
        simTitle: each.title,
        rating: each.rating,
      }))

      //  console.log(similarJob)

      this.setState({
        jobsList: jobItem,
        similarJobList: similarJob,
        skillsList: skill,
        life: lifeAtCompany,
        apiStatus: apiConstStatus.success,
      })
    } else this.setState({apiStatus: apiConstStatus.failure})
  }

  renderJobItem = () => {
    const {jobsList, skillsList, life, similarJobList} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
      title,
      packagePerAnnum,
      rating,
      location,
    } = jobsList

    const {description, lifeLogo} = life

    return (
      <div className="job-item-bg-container">
        <div className="row-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="logo"
          />

          <div className="left">
            <h1> {title}</h1>
            <div className="row-container">
              <AiFillStar className="star" />

              <p>{rating}</p>
            </div>
          </div>
        </div>

        <div className="row-container space">
          <div className="row-container ">
            <div className="row-container">
              <HiLocationMarker />
              <p>{location}</p>
            </div>
            <div className="row-container">
              <IoBagAdd />
              <p>{employmentType}</p>
            </div>
          </div>
          <p> {packagePerAnnum}</p>
        </div>

        <div>
          <hr className="hr-line" />

          <div className="row-container space">
            <h1>Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_parent"
              style={{textDecoration: 'none'}}
            >
              <div className="row-container">
                <p>Visit</p>
                <BsBoxArrowUpRight className="left-1" />
              </div>
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skill-container">
            {skillsList.map(eachItem => (
              <SkillItem key={eachItem.id} skillItem={eachItem} />
            ))}
          </ul>
        </div>

        <h1> Life at Company</h1>
        <div className="row-container">
          <p className="life-desc"> {description}</p>
          <img src={lifeLogo} alt="life at company" className="life-image" />
        </div>

        <hi>Similar Jobs</hi>
        <ul className="ul-sim-list">
          {similarJobList.map(eachList => (
            <SimilarJobItem key={eachList.id} similarJobItem={eachList} />
          ))}
        </ul>
      </div>
    )
  }

  renderProgress = () => (
    // testid="loader"
    // <Loader type="Circles" color="blue" height="50" width="50" />
    //   <Loader type="Ball-Triangle" color="green" height="50" width="50" />
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container bg" testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <Link to="/jobs">
        <button type="button" className="find-button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderAllItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstStatus.success:
        return this.renderJobItem()
      case apiConstStatus.failure:
        return this.renderFailure()
      case apiConstStatus.inProgress:
        return this.renderProgress()
      default:
        return null
    }
  }

  renderNotFound = () => (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="not-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
      <button type="button" onClick={this.profileFail}>
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <div className="job-items-bg-container">
        <Header />
        {this.renderAllItems()}
      </div>
    )
  }
}

export default SimilarJobs
