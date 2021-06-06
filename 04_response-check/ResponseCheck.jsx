import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting')
  const [message, setMessage] = useState('클릭해서 시작하세요.')
  const [result, setResult] = useState([])

  // Hooks에서는 값이 바뀌어도 화면에 영향을 주지 않을 값들을 useRef()로 쓴다.
  const timeout = useRef()
  const startTime = useRef()
  const endTime = useRef()

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready')
      setMessage('초록색이 되면 클릭하세요.')
      // ref는 무조건 current로 접근
      timeout.current = setTimeout(() => {
        setState('now')
        setMessage('지금 클릭!')
        startTime.current = new Date()
      }, Math.floor(Math.random() * 3000) + 2000) // 2 ~ 5초
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current)
      setState('waiting')
      setMessage('너무 성급하셨군요!')
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting')
      setMessage('클릭해서 시작하세요.')
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current])
    }
  }

  const onReset = () => {
    setResult([])
  }

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  }

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  )

}

export default ResponseCheck;