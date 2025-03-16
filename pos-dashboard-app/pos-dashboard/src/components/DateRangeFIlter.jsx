// components/DateRangeFilter.jsx
import { useState } from 'react';
// import './DateRangeFilter.css';

export default function DateRangeFilter({ onDateRangeChange }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  
  const handleApplyFilter = () => {
    onDateRangeChange({ startDate, endDate });
    setActiveFilter(true);
    setIsExpanded(false);
  };
  
  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    onDateRangeChange({ startDate: '', endDate: '' });
    setActiveFilter(false);
  };

  const toggleFilterPanel = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="date-filter-container">
      <button 
        className={`filter-toggle-button ${activeFilter ? 'active-filter' : ''}`}
        onClick={toggleFilterPanel}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6"/>
        </svg>
        <span>Date Filter {activeFilter ? '(Active)' : ''}</span>
      </button>
      
      {isExpanded && (
        <div className="filter-dropdown-panel">
          <div className="filter-panel-header">
            <h4>Filter by Date Range</h4>
          </div>
          
          <div className="date-inputs-container">
            <div className="date-input-group">
              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate || undefined}
              />
            </div>
            
            <div className="date-input-group">
              <label htmlFor="end-date">End Date</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || undefined}
              />
            </div>
          </div>
          
          <div className="filter-actions">
            <button 
              className="apply-filter"
              onClick={handleApplyFilter}
              disabled={!startDate && !endDate}
            >
              Apply Filter
            </button>
            <button 
              className="clear-filter"
              onClick={handleClearFilter}
              disabled={!startDate && !endDate && !activeFilter}
            >
              Clear
            </button>
          </div>
        </div>
      )}
      
      {activeFilter && !isExpanded && (
        <div className="active-filter-badge">
          <span>{startDate ? new Date(startDate).toLocaleDateString() : 'Any'} - {endDate ? new Date(endDate).toLocaleDateString() : 'Any'}</span>
          <button className="clear-badge-button" onClick={handleClearFilter}>×</button>
        </div>
      )}
    </div>
  );
}