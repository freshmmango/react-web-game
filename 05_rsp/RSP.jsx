import React, { Component } from 'react';

const rspCoords = {
  rock: '0',
  scissor: '-142px',
  paper: '-284px',
};

const scores = {
  scissor: 1,
  rock: 0,
  paper: -1,
};

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// -> (state/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// -> 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.rock,
    score: 0
  }

  interval;

  // component가 render를 처음 성공적으로 실행했을 때
  // 여기에서 비동기 요청을 많이 함
  componentDidMount() {
    this.interval = setInterval(() => {
      const { imgCoord } = this.state;
      if (imgCoord === rspCoords.rock) {
        this.setState({
          imgCoord: rspCoords.scissor,
        });
      } else if (imgCoord === rspCoords.scissor) {
        this.setState({
          imgCoord: rspCoords.paper,
        });
      } else if (imgCoord === rspCoords.paper) {
        this.setState({
          imgCoord: rspCoords.rock,
        });
      }
    }, 1000)
  }

  // re-render 후
  componentDidUpdate() {

  }

  // component가 제거되기 직전
  // 여기에서 비동기 요청 정리를 많이 함 ex)setInterval 정리
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onClickBtn = (choice) => {

  }

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;