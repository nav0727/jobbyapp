import {HiLocationMarker} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBagFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobItem} = props
  const {
    simCompanyLogo,
    simEmploy,
    simTitle,
    simJobDesc,
    simLoc,
    rating,
  } = similarJobItem

  return (
    <li className="sim-list">
      <div className="row-container">
        <img
          src={simCompanyLogo}
          alt="similar job company logo"
          className="sim-logo"
        />
        <div className="left">
          <p>{simTitle}</p>
          <div className="row-container">
            <AiFillStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{simJobDesc}</p>
      <div className="row-container">
        <div className="row-container">
          <HiLocationMarker />
          <p>{simLoc}</p>
        </div>
        <div className="row-container">
          <BsFillBagFill />
          <p>{simEmploy}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
