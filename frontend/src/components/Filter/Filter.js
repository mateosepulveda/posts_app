import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [tempFilterText, setTempFilterText] = useState('');

  const handleFilterChange = (event) => {
    setTempFilterText(event.target.value);
  };

  const handleFilterButtonClick = () => {
    onFilterChange(tempFilterText);
  };

  const handleClearButtonClick = () => {
    setTempFilterText('');
    onFilterChange('');
  };

  const isFilterButtonDisabled = tempFilterText.length === 0;

  return (
    <div className="filter-container">
      <input type="text" placeholder="Filtro de nombre" value={tempFilterText} onChange={handleFilterChange} />
      <div className="button-container">
        <button onClick={handleFilterButtonClick} disabled={isFilterButtonDisabled}>Filtrar</button>
        <button onClick={handleClearButtonClick} className="remove-filter-button" disabled={isFilterButtonDisabled}>Quitar filtro</button>
      </div>
    </div>
  );
};

export default Filter;