import React from 'react'

const Button = ({text}) => {
  return (
    <button className='px-5 py-3 rounded-md hover:cursor-pointer bg-zinc-900 text-white font-bold flex items-center justify-center'>
        {text}
    </button>
  )
}

export default Button