import React, { useEffect, useReducer, useCallback } from 'react'
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  recentCell: [-1, -1]
}

export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_GAME = 'RESET_GAME'

// 액션을 실행(dispatch)할 때마다 reducer가 실행됨
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; -> 이렇게 하면 안됨
      return {
        ...state,
        winner: action.winner
      }
    case CLICK_CELL: {
      // 불변성 지키기
      const tableData = [...state.tableData]
      tableData[action.row] = [...tableData[action.row]] // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    }
    case RESET_GAME: {
      return {
        ...state,
        winner: '',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        recentCell: [-1, -1]
      }
    }
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { winner, turn, tableData, recentCell } = state
  // const [winner, setWinner] = useState('')
  // const [turn, setTurn] = useState('O')
  // const [tableData, setTableData] = useState([['', '', ''],['', '', ''],['', '', '']])

  useEffect(() => {
    const [row, cell] = recentCell
    if (row < 0) {
      return
    }
    let win = false;
    // 최근에 누른 row, cell을 기준으로 승리 여부 계산
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    if (win) {
      dispatch({ type: SET_WINNER, winner: turn })
    } else {
      let all = true;
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });

      if (all) {
        dispatch({ type: RESET_GAME})
      } else {
        dispatch({ type: CHANGE_TURN})
      }
    }
  }, [recentCell])

  return (
    <>
      <h1>{turn} 님의 차례입니다.</h1>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <h1>{winner} 님의 승리!</h1>}
    </>
  )

}

export default TicTacToe