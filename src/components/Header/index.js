/* eslint-disable no-unused-vars */
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    const JWTToken = Cookies.remove('jwt_token')

    return history.replace('/login')
  }

  return (
    <nav className="header-container">
      <ul className="header-list">
        <Link to="/">
          <li>
            <img
              className="app-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </Link>

        <div className="header-home-job">
          <Link to="/" style={{textDecoration: 'none'}}>
            <li className="home-job">Home</li>
          </Link>

          <Link to="/jobs" style={{textDecoration: 'none'}}>
            <li className="home-job">Jobs</li>
          </Link>
        </div>
        <li>
          <button
            type="button"
            className="header-logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
