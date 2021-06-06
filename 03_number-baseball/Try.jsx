const React = require('react');
const { useState, memo } = React;

const Try = memo(({ tryInfo }) => {
  
  // 부모에게 물려받은 props를 쓰고 싶으면 우선 state로 만든다
  const [result, setResult] = useState(tryInfo.result)

  const onClick = () => {
    setResult('1')
  }

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  )
})

module.exports = Try;