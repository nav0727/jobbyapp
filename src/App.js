import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Jobs from './components/All Jobs'
import ProtectedRoute from './components/ProtectedRoute'
// import JobItems from './components/JobItems'

import './App.css'
import SimilarJobs from './components/JobItems'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute path="/jobs/:id" component={SimilarJobs} />
      <ProtectedRoute component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
