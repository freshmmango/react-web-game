import React, { Component } from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// -> (state/props 바뀔 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// -> 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
class RSP extends Component {
  state = {
    result: '',
    imgCoord: 0,
    score: 0
  }

  // component가 render를 처음 성공적으로 실행했을 때
  componentDidMount() {

  }

  // re-render 후
  componentDidUpdate() {

  }

  // component가 제거되기 직전
  componentWillUnmount() {

  }

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;