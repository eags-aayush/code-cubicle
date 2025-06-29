import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-background/30 z-10 backdrop-blur-sm sticky top-0 list-none flex justify-between items-center p-5 mb-10'>
      <li><span className='flex gap-5 items-center'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgIT6GBCzZNDv2n6HOKqNSHogYNgISu-4N4Au61wthmtWEY8_y_XlqASMJWQwuXLTIuhQ7UQ&s"
          alt="logo" width={40} />
        <h1 className='font-extrabold'>JanSunwai AI</h1>
      </span></li>
      <li>
        <label className="relative inline-flex items-center w-14 h-8 cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    defaultChecked
    onChange={() => document.documentElement.classList.toggle("dark")}
  />

  <div className="w-full h-full rounded-full bg-gray-300 peer-checked:bg-gray-700 transition-colors duration-300" />

  {/* Light (sun) */}
  <span className="absolute left-1 top-1 text-xl transition-transform duration-300 peer-checked:translate-x-6 peer-checked:opacity-0">
    <img src="https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000" width={23} className='rounded-full'/>
  </span>

  {/* Dark (moon) */}
  <span className="absolute left-1 top-1 text-xl transition-transform duration-300 opacity-0 peer-checked:translate-x-6 peer-checked:opacity-100">
    <img src="https://img.icons8.com/?size=100&id=62034&format=png&color=000000" alt="dark-mode" width={25}/>
  </span>
</label>

      </li>
    </nav >
  )
}

export default Navbar
