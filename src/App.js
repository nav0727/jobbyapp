import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Jobs from './components/All Jobs'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import SimilarJobs from './components/JobItems'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute path="/jobs/:id" component={SimilarJobs} />
      <ProtectedRoute path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </BrowserRouter>
)

export default App
