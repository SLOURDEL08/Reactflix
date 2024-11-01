import React, { useState } from 'react';

export const FilterDropdown = ({ label, options, selected, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="sort-menu">
      <button 
        className="sort-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <div className="sor-icon">{icon}</div>}
        {label}
      </button>
      {isOpen && (
        <div className="sort-panel">
          <div className="sort-panel-header">
            <span className="sort-title">{label}</span>
            {selected.length > 0 && (
              <button
                className="reset-sort"
                onClick={() => {
                  onChange([], true);
                  setIsOpen(false);
                }}
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
                  onChange={() => handleChange(option.value)}
                />
                <span className="sort-item-label">
                  {option.label}
                  {typeof option.count === 'number' && <span className="item-count">({option.count})</span>}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};