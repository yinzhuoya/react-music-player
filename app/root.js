import React, { Component } from 'react'
import Header from './components/header'
import Progress from './components/progress'

class Root extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Progress progress='1'/>
      </div>
    )
  }
}

export default Root