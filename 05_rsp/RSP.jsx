import React, { useState, useRef, useEffect } from 'react';

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

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);
  const interval = useRef();
  
  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    interval.current = setInterval(changeHand, 100)
    return () => { // componentWillUnmount 역할
      clearInterval(interval.current)
    }
  }, [imgCoord]) // 배열: closure 문제 해결 (해당 값들이 바뀔 때 useEffect 실행)

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor)
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper)
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock)
    }
  }

  // 많이 쓰는 메소드 패턴(Higher-order function)
  const onClickBtn = (choice) => () => {
    clearInterval(interval.current) // 잠깐 멈춰서 결과 확인
    const myScore = scores[choice]
    const cpuScore = scores[computerChoice(imgCoord)]
    const diff = myScore - cpuScore

    if (diff === 0) {
      setResult('비겼습니다!')
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!')
      setScore((prevScore) => prevScore + 1)
    } else {
      setResult('졌습니다!')
      setScore((prevScore) => prevScore - 1)
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100)
    }, 1000)

  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default RSP;