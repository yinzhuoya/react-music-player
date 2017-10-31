import React, { Component } from 'react'
import Progress from '../components/progress'
import './player.less'
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'

let duration = null

class Player extends Component {
  constructor() {
    super()
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    }
  }

  playPrev() {
    Pubsub.publish('PLAY_PREV')
  }

  playNext() {
    Pubsub.publish('PLAY_NEXT')
  }

  formatTime(time) {
    time = Math.floor(time)
    let miniutes = Math.floor(time / 60)
    let seconds = Math.floor( time % 60 )
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${miniutes}:${seconds}`
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 -e.jPlayer.status.currentPercentAbsolute  / 100))
      })
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer('play',duration * progress)
    this.setState({
			isPlay: true
		});
  }

  changeVolumeHandler(progress) {
    $('#player').jPlayer('volume',progress)

  }

  play(){
    if(this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }

    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  render() {
    return (
      <div className="player-page">  
        <h1 className="caption">
          <Link to="/list">我的私人音乐 &gt;</Link>
        </h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="muisic-artist mt10">{this.props.currentMusicItem.artist}</h3>
            <div className="mt20 row">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                <div className="volume-wrapper">
                  <Progress 
                    progress= {this.state.volume}
                    onProgressChange={this.changeVolumeHandler}
                    barColor="#aaa" />
                </div>
              </div>
            </div>
            <div style={{height: 10, lineHeight: '10px'}}>
              <Progress
                progress={this.state.progress} 
                onProgressChange={this.progressChangeHandler}/>
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'} `} onClick={this.play.bind(this)}></i>
                <i className="icon ml20 next" onClick={this.playNext.bind(this)}></i>
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle" ></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
          </div>
        </div>
      </div>
    )
  }
}

export default Player