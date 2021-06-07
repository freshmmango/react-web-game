import React, { memo, useMemo } from 'react'

import Td from './Td'

// useMemo로 component를 기억할 수도 있다.
// useMemo는 값 기억. useCallback은 함수 기억
const Tr = memo(({ rowIndex, rowData, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) =>
      (useMemo(
        () => <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch} />,
        [rowData[i]] // 칸에 들어있는 내용물이 바뀌었을 때만 새로 렌더링. 아닐 때에는 컴포넌트를 기억
      )))}
    </tr>
  )
})

export default Tr