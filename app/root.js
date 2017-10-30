import React, { Component } from 'react'
import Header from './components/header'
import Progress from './components/progress'

let duration = null
class Root extends Component {
  constructor() {
    super()
    this.state = {
      progress: '-'
    }
  }
  componentDidMount() {
    $('#player').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia',{
          mp3: 'http://juxiangstatic.oss-cn-hangzhou.aliyuncs.com/h5/react/91c6%252Ffdfb%252F8c40%252Fe41be844e4d372d980362e80cadbefd6.mp3'
        }).jPlayer('play')
      },
      supplied: 'mp3',
      wmode: 'window'
    })
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      })
    })
  }

  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer('play',duration * progress)
  }
  render() {
    return (
      <div>
        <Header/>
        <Progress 
          progress={ this.state.progress }
          onProgressChange={this.progressChangeHandler}
          barColor="#ff0000" />
      </div>
    )
  }
}

export default Root