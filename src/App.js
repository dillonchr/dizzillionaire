import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './video-player';

class App extends Component {
    state = {
        selectedVideo: null,
        videos: []
    };

    renderVideoOptions() {
        return this.state.videos.map(v => {
            return (
                <li key={v.path} className={this.state.selectedVideo === v ? 'App__videolink--selected' : 'App__videolink'} onClick={() => this.setState({selectedVideo: v})}>
                    {v.name}
                </li>
            );
        });
    }

    componentWillMount() {
        fetch('movies.json')
            .then(r => r.json())
            .then(videos => this.setState({videos}));
    }

    render() {
        return (
            <div className="App">
                <div className="App__header">
                    <marquee>
                        <img src="development.gif" className="App__logo" alt="logo" />
                        Dizzillionaire Productions...
                        <img src="development.gif" className="App__logo" alt="logo" />
                    </marquee>
                </div>
                <div className="App__sidebar">
                    <ul>
                        {this.renderVideoOptions()}
                    </ul>
                </div>
                <div className="App__content">
                    {!!this.state.selectedVideo && <VideoPlayer video={this.state.selectedVideo} />}
                    {!this.state.selectedVideo && <p>Select a video on the left</p>}
                </div>
            </div>
        );
    }
}

export default App;
