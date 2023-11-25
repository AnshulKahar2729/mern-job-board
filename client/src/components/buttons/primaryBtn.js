import React from 'react'

function primaryBtn({children}) {
  return (
    <button className='bg-blue-600 py-2 px-4 text-white rounded-md'>{children}</button>
  )
}

export default primaryBtn