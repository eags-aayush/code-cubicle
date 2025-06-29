export default function Navbar() {

  return (
    <nav className='bg-background text-text flex flex-row justify-between p-5 top-0 sticky transition-colors duration-300'>
      <h2 className='font-bold'>JanSunwai AI - Admin</h2>
      <label className="relative inline-flex items-center w-14 h-8 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked
          onChange={() => document.documentElement.classList.toggle("dark")}
        />

        <div className="w-full h-full rounded-full bg-gray-300 peer-checked:bg-gray-700" />

        {/* Light (sun) */}
        <span className="absolute left-1 top-1 text-xl transition-transform duration-300 peer-checked:translate-x-6 peer-checked:opacity-0">
          <img src="https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000" width={23} className='rounded-full' />
        </span>

        {/* Dark (moon) */}
        <span className="absolute left-1 top-1 text-xl transition-transform duration-300 opacity-0 peer-checked:translate-x-6 peer-checked:opacity-100">
          <img src="https://img.icons8.com/?size=100&id=62034&format=png&color=000000" alt="dark-mode" width={25} />
        </span>
      </label>
    </nav>
  );
}