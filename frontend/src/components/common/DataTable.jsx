import { useState, useMemo, useRef, useEffect } from 'react'
import { FiSearch, FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiSliders, FiX, FiMoreVertical, FiFilter } from 'react-icons/fi'
import './DataTable.css'

function DataTable({
  columns,
  data,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  searchable = false,
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'No se encontraron registros',
  filters = [],
  filterKey,
  advancedFilters = [],
  onRowClick,
  rowActions,
  totalLabel = 'registros',
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(pageSize)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [activeFilter, setActiveFilter] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [advancedValues, setAdvancedValues] = useState({})
  const [openActionId, setOpenActionId] = useState(null)
  const actionRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setOpenActionId(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = useMemo(() => {
    let result = [...data]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((row) =>
        columns.some((col) => {
          const val = row[col.key]
          return val && String(val).toLowerCase().includes(q)
        })
      )
    }
    if (activeFilter) {
      result = result.filter((row) => {
        const val = row[filterKey || columns[0]?.key]
        return String(val).toLowerCase() === activeFilter.toLowerCase()
      })
    }
    return result
  }, [data, search, columns, activeFilter, filterKey])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null) return 1
      if (bVal == null) return -1
      const cmp = typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / perPage)
  const start = (currentPage - 1) * perPage
  const end = Math.min(start + perPage, sorted.length)
  const paginated = sorted.slice(start, end)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)
      if (currentPage <= 3) { startPage = 2; endPage = Math.min(4, totalPages - 1) }
      if (currentPage >= totalPages - 2) { startPage = Math.max(totalPages - 3, 2); endPage = totalPages - 1 }
      if (startPage > 2) pages.push('...')
      for (let i = startPage; i <= endPage; i++) pages.push(i)
      if (endPage < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="dt">
      {(searchable || filters.length > 0 || advancedFilters.length > 0) && (
        <div className="dt-toolbar">
          <div className="dt-toolbar-left">
            {searchable && (
              <div className="dt-search">
                <FiSearch size={16} className="dt-search-icon" />
                <input type="text" className="dt-search-input" placeholder={searchPlaceholder} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }} />
                {search && <button className="dt-search-clear" onClick={() => setSearch('')}><FiX size={14} /></button>}
              </div>
            )}
          </div>
          <div className="dt-toolbar-right">
            {advancedFilters.length > 0 && (
              <button className={`dt-btn-icon ${showAdvanced ? 'dt-btn-icon--active' : ''}`} onClick={() => setShowAdvanced((s) => !s)} title="Filtros avanzados">
                <FiSliders size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {filters.length > 0 && (
        <div className="dt-quick-filters">
          <button className={`dt-quick-filter ${!activeFilter ? 'dt-quick-filter--active' : ''}`} onClick={() => { setActiveFilter(null); setCurrentPage(1) }}>Todas</button>
          {filters.map((f) => (
            <button key={f.value} className={`dt-quick-filter ${activeFilter === f.value ? 'dt-quick-filter--active' : ''}`} onClick={() => { setActiveFilter(f.value); setCurrentPage(1) }}>
              {f.label}
            </button>
          ))}
        </div>
      )}

      {showAdvanced && advancedFilters.length > 0 && (
        <div className="dt-advanced">
          <div className="dt-advanced-grid">
            {advancedFilters.map((af, i) => (
              <div key={i} className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{af.label}</label>
                {af.type === 'select' ? (
                  <select className="form-input" value={advancedValues[af.key] || ''} onChange={(e) => setAdvancedValues((v) => ({ ...v, [af.key]: e.target.value }))}>
                    <option value="">Todos</option>
                    {af.options.map((o) => (<option key={o} value={o}>{o}</option>))}
                  </select>
                ) : (
                  <input className="form-input" type={af.type || 'text'} placeholder={af.placeholder || ''} value={advancedValues[af.key] || ''} onChange={(e) => setAdvancedValues((v) => ({ ...v, [af.key]: e.target.value }))} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dt-table-wrapper">
        {sorted.length === 0 ? (
          <div className="dt-empty">
            <FiSearch size={32} />
            <p className="dt-empty-title">{emptyMessage}</p>
            {search && <p className="dt-empty-text">Intenta con otros términos de búsqueda.</p>}
          </div>
        ) : (
          <table className="dt-table">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className={`dt-th ${col.sortable !== false ? 'dt-th--sortable' : ''}`} style={col.width ? { width: col.width } : {}} onClick={() => col.sortable !== false && handleSort(col.key)}>
                    <div className="dt-th-content">
                      <span>{col.label}</span>
                      {col.sortable !== false && (
                        <span className="dt-sort-icon">
                          {sortKey === col.key ? (sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />) : <FiChevronUp size={14} className="dt-sort-inactive" />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {rowActions && <th className="dt-th dt-th--actions" style={{ width: '60px' }} />}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, ri) => (
                <tr key={ri} className="dt-row" onClick={() => onRowClick?.(row)}>
                  {columns.map((col, ci) => (
                    <td key={ci} className="dt-td">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="dt-td dt-td--actions">
                      <div className="dt-actions-wrapper" ref={actionRef}>
                        <button className="dt-actions-btn" onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === ri ? null : ri) }}>
                          <FiMoreVertical size={16} />
                        </button>
                        {openActionId === ri && (
                          <div className="dt-actions-menu">
                            {rowActions.map((action, ai) => (
                              <button key={ai} className="dt-actions-item" onClick={(e) => { e.stopPropagation(); action.onClick(row); setOpenActionId(null) }}>
                                {action.icon && <span className="dt-actions-item-icon">{action.icon}</span>}
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {sorted.length > 0 && (
        <div className="dt-footer">
          <div className="dt-footer-left">
            <span className="dt-records">
              {start + 1}-{end} de {sorted.length} {totalLabel}
            </span>
          </div>
          <div className="dt-footer-center">
            <div className="dt-pagination">
              <button className="dt-page-btn" disabled={currentPage === 1} onClick={() => handlePageChange(1)} title="Primera página"><FiChevronsLeft size={16} /></button>
              <button className="dt-page-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} title="Anterior"><FiChevronLeft size={16} /></button>
              {getPageNumbers().map((p, i) =>
                p === '...' ? <span key={`e${i}`} className="dt-page-ellipsis">...</span> : (
                  <button key={p} className={`dt-page-btn dt-page-num ${currentPage === p ? 'dt-page-num--active' : ''}`} onClick={() => handlePageChange(p)}>{p}</button>
                )
              )}
              <button className="dt-page-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} title="Siguiente"><FiChevronRight size={16} /></button>
              <button className="dt-page-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)} title="Última página"><FiChevronsRight size={16} /></button>
            </div>
          </div>
          <div className="dt-footer-right">
            <select className="dt-page-size" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1) }}>
              {pageSizeOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
