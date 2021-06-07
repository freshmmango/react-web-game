import React, { useContext } from 'react'

import { TableContext, CODE } from './MineSearch'

const getTdStyle = (code) => {
  switch(code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#7E7'
      }
    case CODE.OPENED:
    case CODE.CLICKED_MINE:
      return {
        background: 'white'
      }
  }
}

const getTdText = (code) => {
  switch(code) {
    case CODE.NORMAL:
      return ''
    case CODE.MINE:
      return 'X'
  }
}

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData } = useContext(TableContext)
  return (
    <td style={getTdStyle(tableData[rowIndex][cellIndex])}>{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
}

export default Td