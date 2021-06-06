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

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord
  })[0]
}

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

  changeHand = () => {
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
  }

  // component가 render를 처음 성공적으로 실행했을 때
  // 여기에서 비동기 요청을 많이 함
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100)
  }

  // re-render 후
  componentDidUpdate() {

  }

  // component가 제거되기 직전
  // 여기에서 비동기 요청 정리를 많이 함 ex)setInterval 정리
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // 많이 쓰는 메소드 패턴(Higher-order function)
  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state
    clearInterval(this.interval) // 잠깐 멈춰서 결과 확인
    const myScore = scores[choice]
    const cpuScore = scores[computerChoice(imgCoord)]
    const diff = myScore - cpuScore

    if (diff === 0) {
      this.setState({ result: '비겼습니다!' })
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1
        }
      })
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100)
    }, 1000)
    
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