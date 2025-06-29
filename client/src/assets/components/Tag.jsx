import React from 'react'

const Tag = ({tags}) => {
  return (
    <ul className='list-none flex flex-row gap-3 flex-wrap w-[100%]'>
    {tags.map((tag, index) => (
        <li className='w-fit h-fit border rounded-full p-1 px-3' key={index}>{tag}</li>
    ))}
    </ul>
  )
}

export default Tag
