import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Hello from './components/hello'

import './index.less'

ReactDOM.render(
  <AppContainer>
    <Hello/>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/hello', () => {
    const NewHello = require('./components/hello').default
    ReactDOM.render(
      <AppContainer>
        <NewHello/>
      </AppContainer>,
    document.getElementById('root')
    )
  })
}

// console.log(React.version)