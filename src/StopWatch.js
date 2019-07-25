import React from 'react';
const ms = require('pretty-ms');

class Timer extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        time: 0,
        isOn: false,
        start: 0,
        isStarted: false,
      }
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
    }
    startTimer() {
      this.setState({
        isOn: true,
        time: this.state.time,
        start: Date.now() - this.state.time
      })
      this.timer = setInterval(() => this.setState({
        time: Date.now() - this.state.start
      }), 1);
    }
    stopTimer() {
      this.setState({isOn: false});
      clearInterval(this.timer);
    }
    resetTimer() {
      this.setState({time: 0, isOn: false});
      clearInterval(this.timer);
    }
    render() {
      const {isOn, isStarted} = this.state;
      return(
        <div>
          <div className="clock">
              <h1>Время:  {ms(this.state.time)}</h1>
              <div className="circle">
                  <span
                    className="secondhand"
                    style={{
                      transform: `rotate(${this.state.time / 1000 * 6}deg)`,
                    }}
                  />
                  <div className="point" />
              </div>
          </div>
          <button disabled={isStarted} id="button__start" className="button" onClick={() => {
            this.setState({
              isStarted: true,
            });
            this.startTimer();
          }}
          >Старт</button>
          {
            isOn || !isStarted ? (
              <button disabled={!isStarted} id="button__stop" className="button" onClick={this.stopTimer}>Стоп</button>
            ) : (
              <button id="button__stop" className="button" onClick={this.startTimer}>Продолжить</button>
            )
          }
          <button disabled={!isStarted} id="button__reset" className="button" onClick={() => {
            this.setState({
              isStarted: false,
            });
            this.resetTimer();
          }}
          >
            Сброс
          </button>
        </div>
      )
    }
  }
  export default Timer;