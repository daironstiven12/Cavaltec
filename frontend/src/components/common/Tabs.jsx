import { useState } from 'react'
import './Tabs.css'

function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="tabs">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button key={tab.id} className={`tabs-btn ${activeTab === tab.id ? 'tabs-btn--active' : ''}`} onClick={() => onChange(tab.id)}>
            {tab.icon && <span className="tabs-btn-icon">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
