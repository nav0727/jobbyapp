import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorStatus: false, errorMsg: ''}

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePass = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = JWTToken => {
    const {history} = this.props
    Cookies.set('jwt_token', JWTToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubFailure = errorMsg => {
    this.setState({errorStatus: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data.jwt_token)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubFailure(data.error_msg)
    }
  }

  renderUser = () => {
    const {username} = this.state
    return (
      <div className="login-input">
        <label htmlFor="name">USERNAME</label>

        <input
          type="text"
          id="name"
          placeholder="Username"
          value={username}
          onChange={this.onChangeName}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="login-input">
        <label htmlFor="pass">PASSWORD</label>

        <input
          type="password"
          id="pass"
          placeholder="Password"
          value={password}
          onChange={this.onChangePass}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, errorStatus} = this.state
    const JWTToken = Cookies.get('jwt_token')

    if (JWTToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form onSubmit={this.onLogin}>
            {this.renderUser()}
            {this.renderPassword()}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          {errorStatus && <p> {errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
