import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './video-player';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src="/development.gif" className="App-logo" alt="logo" />
        <br />
        <VideoPlayer videoPath='dns.mp4' />
      </div>
    );
  }
}

export default App;
