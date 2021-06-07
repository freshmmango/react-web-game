import React, { useReducer, createContext, useMemo } from 'react';

import Table from './Table'
import Form from './Form'

export const CODE = {
  MINE: -7,
  NORMAL : -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0 // 0 이상이면 다 opened
}

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {}
})

const initialState = {
  tableData: [],
  timer: 0
}

export const START_GAME = 'START_GAME'

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    default:
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {tableData, timer} = state

  // Provider로 감싸주기
  // 매번 새로 render되지 않게 하기 위해 useMemo 사용
  const value = useMemo(
    () => {tableData, dispatch}, [tableData]
  )
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
    </TableContext.Provider>
  )
}

export default MineSearch