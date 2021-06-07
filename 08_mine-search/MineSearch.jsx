import React, { useReducer } from 'react';

const initialState = {
  tableData: [],
  timer: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {tableData, timer} = state

  return (
    <>
      <Form dispatch={dispatch} />
      <div>{timer}</div>
      <Table />
    </>
  )
}

export default MineSearch