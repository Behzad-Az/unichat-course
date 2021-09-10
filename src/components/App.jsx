import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext.jsx'

import Chats from './Chats.jsx'
import Login from './Login.jsx'

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
       </AuthProvider>
      </Router>
    </div>
  )
}

export default App
