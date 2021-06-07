import React, {useCallback} from 'react'

import {CLICK_CELL, CHANGE_TURN} from './TicTacToe'

const Td = ({rowIndex, cellIndex, cellData, dispatch}) => {
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