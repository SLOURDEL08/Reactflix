// components/filters/FilterDropdown.js
import React from 'react';

export const FilterDropdown = ({ label, options, selected, onChange, icon }) => (
  <div className="sort-menu">
    <button className="sort-trigger">
      {icon && <div className="sor-icon">{icon}</div>}
      {label}
    </button>
    <div className="sort-panel">
      <div className="sort-panel-header">
        <span className="sort-title">{label}</span>
        {selected.length > 0 && (
          <button 
            className="reset-sort"
            onClick={() => onChange([], true)}
          >
            Réinitialiser
          </button>
        )}
      </div>
      <div className="sort-options-list">
        {options.map(option => (
          <label key={option.value} className="sort-item">
            <input
              type="checkbox"
              className="sort-checkbox"
              checked={selected.includes(option.value)}
              onChange={() => onChange([option.value])}
            />
            <span className="sort-item-label">
              {option.label}
              {option.count && <span className="item-count">({option.count})</span>}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
);