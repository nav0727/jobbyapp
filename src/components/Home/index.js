/* eslint-disable react/no-unescaped-entities */
import {Link} from 'react-router-dom'

// import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <div className="home-sub-container">
        <h1 className="home-heading"> Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          review's. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <button type="button" className="find-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
