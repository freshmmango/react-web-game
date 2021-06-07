import React, { useReducer, createContext, useMemo } from 'react';

import Table from './Table'
import Form from './Form'

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0 // 0 이상이면 다 opened
}

export const TableContext = createContext({
  tableData: [],
  dispatch: () => { }
})

const initialState = {
  tableData: [],
  timer: 0,
  halted: true
}

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell).fill().map((arr, i) => i)
  const shuffle = []
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    shuffle.push(chosen)
  }
  const data = []
  for (let i = 0; i < row; i++) {
    const rowData = []
    data.push(rowData)
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL)
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell)
    const hor = shuffle[k] % cell
    data[ver][hor] = CODE.MINE
  }

  return data
}

export const START_GAME = 'START_GAME'
export const OPEN_CELL = 'OPEN_CELL'
export const CLICK_MINE = 'CLICK_MINE'
export const FLAG_CELL = 'FLAG_CELL'
export const QUESTION_CELL = 'QUESTION_CELL'
export const NORMALIZE_CELL = 'NORMALIZE_CELL'

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false
      }
    case OPEN_CELL: {
      const tableData = [...state.tableData]
      const { row, cell } = action
      const checked = [] // 한번 검사한 칸은 검사하지 않도록

      tableData[row] = [...tableData[row]]
      // 자신 뿐만 아니라 주변의 값도 바뀔 것이므로 전부 새로 만듬
      tableData.forEach((row, i) => {
        tableData[i] = [...row]
      })

      // 재귀하여 탐색
      const checkAround = (row, cell) => {
        // 열린 칸 무시
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return
        }
        // 상하좌우 칸이 아닌 경우 무시
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return
        }
        // 이미 검사한 칸이면 무시
        if (checked.includes(row + '/' + cell)) {
          return
        } else {
          checked.push(row + '/' + cell)
        }

        let around = []

        if (tableData[row - 1]) { // 내 윗줄이 있으면 윗줄 세칸을 검사 대상으로
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          )
        }
        around = around.concat(
          tableData[row][cell - 1], tableData[row][cell + 1] // 좌우 칸이 없어도 아래 filter에서 무시되므로 괜찮음
        )
        if (tableData[row + 1]) { // 내 윗줄이 있으면 윗줄 세칸을 검사 대상으로
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          )
        }

        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        tableData[row][cell] = count

        if (count === 0) { // 주변 칸 오픈
          const near = []
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1])
            near.push([row - 1, cell])
            near.push([row - 1, cell + 1])
          }
          near.push([row, cell - 1])
          near.push([row, cell + 1])
          if (row + 1 < tableData.length) {
            near.push([row + 1, cell - 1])
            near.push([row + 1, cell])
            near.push([row + 1, cell + 1])
          }

          // 주변 재귀 탐색
          near.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1])
            }
          })
        }
      }

      checkAround(row, cell)
      return {
        ...state,
        tableData
      }
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      tableData[action.row][action.cell] = CODE.CLICKED_MINE
      return {
        ...state,
        tableData,
        halted: true
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE
      } else {
        tableData[action.row][action.cell] = CODE.FLAG
      }
      return {
        ...state,
        tableData
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION
      }
      return {
        ...state,
        tableData
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL
      }
      return {
        ...state,
        tableData
      }
    }
    default:
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { tableData, timer, halted } = state

  // Provider로 감싸주기
  // 매번 새로 render되지 않게 하기 위해 useMemo 사용
  const value = useMemo(
    () => ({ tableData, dispatch, halted }), [tableData, halted]
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