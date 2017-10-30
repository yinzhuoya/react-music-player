import React, { Component } from 'react'
import './progress.less'




class Progress extends Component {
  changeProgress(e){
    let progressBar = this.refs.progressBar
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
    this.props.onProgressChange && this.props.onProgressChange(progress)
    console.log(progress)
  }
  render() {
    return (
      <div 
        className="components-progress"
        onClick={this.changeProgress.bind(this)}
        ref="progressBar">
        <div 
          className="progress" 
          style={{width: `${this.props.progress}%`, background:this.props.barColor}}>
        </div>
      </div>
    )
  }
}
Progress.defaultProps = {
  barColor: '#2f9800'
}
export default Progress