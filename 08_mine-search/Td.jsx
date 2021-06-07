import React, { useContext, useCallback, memo, useMemo } from 'react'

import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch'

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#7E7'
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: '#E88'
      }
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: '#EE7'
      }
    default:
      return {
        background: 'white'
      }
  }
}

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return ''
    case CODE.CLICKED_MINE:
      return '💥'
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '🚩'
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?'
    default:
      return code ? code : ''
  }
}

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext)

  const onClickTd = useCallback(() => {
    if (halted) {
      return
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex })
        return
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex })
    }
  }, [tableData[rowIndex][cellIndex], halted])

  const onRightClickTd = useCallback((e) => {
    if (halted) {
      return
    }
    e.preventDefault()
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex })
        return
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex })
        return
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex })
        return
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted])

  return useMemo(() => (
    <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd} onContextMenu={onRightClickTd}>
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  ))
})

export default Td