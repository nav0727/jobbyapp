/* eslint-disable no-unused-vars */
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBagFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import {IoBagAdd} from 'react-icons/io5'
import './index.css'

const JobCard = props => {
  const {jobItem} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
    <Link to={`jobs/${id}`} style={{textDecoration: 'none'}}>
      <li className="item-bg-container">
        <div className="row-container">
          <img src={companyLogoUrl} alt="company logo" className="company" />

          <div className="col-container left">
            <h1 className="heading"> {title} </h1>

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

        <hr className="hr-line" />

        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
