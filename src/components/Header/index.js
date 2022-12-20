import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="header-home-job">
        <Link to="/" style={{textDecoration: 'none'}}>
          <li className="home-job">Home</li>
        </Link>

        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <li className="home-job">Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="header-logout-button"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
