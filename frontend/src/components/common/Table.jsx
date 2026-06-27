import './Table.css'

function Table({ columns, data, onRowClick }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="table-th" style={col.width ? { width: col.width } : {}}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri} className="table-row" onClick={() => onRowClick?.(row)}>
              {columns.map((col, ci) => (
                <td key={ci} className="table-td">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
