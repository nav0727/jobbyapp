import {Component} from 'react'

import {HiLocationMarker} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import {IoBagAdd} from 'react-icons/io5'

import Cookies from 'js-cookie'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarItems'

import './index.css'

class SimilarJobs extends Component {
  state = {jobsList: [], skillsList: [], life: [], similarJobList: []}

  componentDidMount() {
    this.getItemData()
  }

  getItemData = async () => {
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
      })
    }
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
          <h1>skills</h1>
          <ul className="skill-container">
            {skillsList.map(eachItem => (
              <SkillItem key={eachItem.id} skillItem={eachItem} />
            ))}
          </ul>
        </div>

        <h1> Life at Company</h1>
        <div className="row-container">
          <p className="life-desc"> {description}</p>
          <img src={lifeLogo} alt="life_at_company" className="life-image" />
        </div>

        <hi>Similar Job</hi>
        <ul className="ul-sim-list">
          {similarJobList.map(eachList => (
            <SimilarJobItem key={eachList.id} similarJobItem={eachList} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <div>{this.renderJobItem()}</div>
  }
}

export default SimilarJobs
