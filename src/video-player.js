import React, { Component } from 'react';

export default class VideoPlayer extends Component {
    state = {
        currentSubtitle: '',
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        loop: false,
        subtitles: [],
        rate: 1,
        title: 'Loading...',
        year: 0
    };

    render() {
        return(
            <div className="videoPlayer">
                <video ref={r => this.video = r}
                       style={{background:'magenta', width: 300}}
                       src={`movies/${this.props.videoPath}`}
                       onClick={this.playPauseRestart}
                       onEnded={this.stop.bind(this)}
                       onTimeUpdate={this.updateCurrentTime.bind(this)}
                       onDurationChange={this.updateDuration.bind(this)} />
                <div className="videoPlayer__controls">
                    <div className="videoPlayer__control-field">
                        <span className="videoPlayer__time">{this.renderPlaybackTime()}</span>
                    </div>
                    <div className="videoPlayer__control-field">
                        <button onClick={this.playPauseRestart}>{this.state.isPlaying ? 'Pause' : 'Play'}</button>
                    </div>
                    <div className="videoPlayer__control-field">
                        <label>
                            Loop
                            <input type="checkbox" value={this.state.loop} onClick={this.toggleLoop.bind(this)} />
                        </label>
                    </div>
                    <div className="videoPlayer__control-field">
                        <label>
                            Rate
                            <input type="number" value={this.state.rate} onChange={this.updateRate.bind(this)} step="0.1" />
                        </label>
                    </div>
                    <div className="videoPlayer__control-field">
                        <label>
                            Seek
                            <input type="range" disabled={this.state.isPlaying} value={this.state.currentTime} step="0.01" min="0" max={this.state.duration} onChange={this.seek.bind(this)} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    renderPlaybackTime() {
        return this.state.currentTime;
        const t = ~~this.state.currentTime;
        const minutes = ~~(t / 60);
        const seconds = '' + t % 60;
        return minutes + ':' + seconds.padStart(2, '0');
    }

    toggleLoop() {
        this.setState({loop: !this.state.loop});
    }

    playPauseRestart = () => {
        const isPlaying = !this.state.isPlaying;
        this.setState({isPlaying}, () => {
            if (isPlaying) {
                this.video.play();
            } else {
                this.video.pause();
            }
        });
    };

    stop() {
        if (this.state.loop) {
            this.video.currentTime = 0;
            this.video.play();
        } else {
            this.setState({isPlaying: false});
        }
    }

    updateCurrentTime() {
        const {currentTime} = this.video;
        const currentSubtitleObj = this.state.subtitles.find(sub => sub.start <= currentTime && sub.stop > currentTime);
        const currentSubtitle = currentSubtitleObj ? currentSubtitleObj.text.map((t, i) => <p key={i}>{t}</p>) : '';
        this.setState({currentTime, currentSubtitle});
    }

    updateRate(e) {
        const rate = +e.target.value;
        this.setState({rate}, () => {
            this.video.playbackRate = rate;
        });
    }

    updateDuration() {
        this.setState({duration: this.video.duration}, () => console.log(this.state));
    }

    seek(e) {
        if (!this.state.isPlaying) {
            this.video.currentTime = +e.target.value;
        }
    }
}