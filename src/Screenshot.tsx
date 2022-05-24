import React from 'react'

interface Props {
  id: number
  videoQuestion: string
  handleQuestion(id: number) :void
}

const Screenshot:React.FC<Props> = ({ id, videoQuestion, handleQuestion }) => {
  return (
    <div className='screenshot'>
      <button onClick={() => handleQuestion(id)}>
        <h2>{videoQuestion}</h2>
      </button>
    </div>
  )
}

export default Screenshot