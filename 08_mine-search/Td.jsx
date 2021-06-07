import React, {useCallback, useEffect, useRef } from 'react'

import {CLICK_CELL, CHANGE_TURN} from './TicTacToe'

const Td = ({rowIndex, cellIndex, cellData, dispatch}) => {
  console.log('td rendered');

  // 원치 않는 re-render를 유발하는 범인을 찾는 기법. false인 친구가 바뀐 것이다
  // 이 예제는 사실 아래와는 관계 없고 React.memo를 적용하면 끝
  const ref = useRef([])
  useEffect(() => {
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], cellData === ref.current[2], dispatch === ref.current[3])
    ref.current = [rowIndex, cellIndex, cellData, dispatch]
  }, [rowIndex, cellIndex, cellData, dispatch])

  const onClickTd = useCallback(() => {
    if (cellData) { // 이미 그려진 칸에 그려지지 않게
      return
    }
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex})
  })

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
}

export default Td