import { FiSearch } from 'react-icons/fi'
import './SearchBar.css'

function SearchBar({ placeholder = 'Buscar...', ...props }) {
  return (
    <div className="search-bar">
      <FiSearch size={18} className="search-bar-icon" />
      <input type="text" className="search-bar-input" placeholder={placeholder} readOnly {...props} />
    </div>
  )
}

export default SearchBar
