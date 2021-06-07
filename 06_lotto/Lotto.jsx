import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Ball from './Ball'

// 함수형 컴포넌트의 경우 render할 때마다 전체가 다시 실행되므로 useMemo 처리해주지 않으면 계속 수행됨
function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1)
  const shuffle = []
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
  }
  const bonusNumber = shuffle[shuffle.length - 1]
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
  return [...winNumbers, bonusNumber]
}

// useMemo: 복잡한 함수 결과값을 기억
// useRef: 일반 값을 기억
const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), [])
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]])
      }, (i + 1) * 1000)
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6])
    }, 7000)
    timeouts.current[7] = setTimeout(() => {
      setRedo(true)
    }, 8000)

    return () => {
      timeouts.current.forEach((v) => { clearTimeout(v) })
    }
  }, [timeouts.current]) // redo 시점에 timeouts.current가 바뀌므로 useEffect가 다시 실행됨
  // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

  // useCallback: 함수를 기억
  // child에게 props로 전달할 함수는 useCallback을 꼭 붙여야 함! (자식이 매번 re-render 되어버리므로)
  const onClickRedo = useCallback(() => {
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]) // 지정해두지 않으면 useCallback이 state를 기억해두어 변하지 않으므로 사용할 값은 배열에 추가

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      <div>
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      </div>
    </>
  )
}

export default Lotto;
