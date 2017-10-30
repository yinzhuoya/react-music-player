import React, { Component } from 'react'
import Header from './components/header'
import Player from './components/page/player'
import { MUSIC_LIST } from './config/musiclist'

class Root extends Component {
  constructor() {
    super()
    this.state = {
      currentMusicItem: MUSIC_LIST[0]
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
  }

  render() {
    return (
      <div>
        <Header/>
        <Player currentMusicItem={this.state.currentMusicItem}/>
      </div>
    )
  }
}

export default Root