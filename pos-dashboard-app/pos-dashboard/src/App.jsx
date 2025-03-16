// App.jsx
import { useState, useEffect } from 'react';
import MerchantProfile from './components/MerchantProfile';
import TransactionHistory from './components/TransactionHistory';
import DateRangeFilter from './components/DateRangeFilter';
import { fetchMerchantData, fetchTransactions } from './services/apiService';
import './App.css';

function App() {
  const [merchantData, setMerchantData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  
  // In a real app, you might get this from auth context or URL params
  const merchantId = 'MNT00006';

  const loadMerchantData = async () => {
    try {
      const data = await fetchMerchantData(merchantId);
      setMerchantData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load merchant data. Please try again later.');
      console.error('Error fetching merchant data:', err);
    }
  };

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const result = await fetchTransactions(
        merchantId, 
        dateRange.startDate, 
        dateRange.endDate
      );
      setTransactions(result || []);
      setError(null);
    } catch (err) {
      setError('Failed to load transactions. Please try again later.');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on initial render
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await loadMerchantData();
      await loadTransactions();
    };
    
    initializeData();
  }, [merchantId]);

  // Reload transactions when date range changes
  useEffect(() => {
    loadTransactions();
  }, [dateRange]);

  const handleRefresh = () => {
    loadTransactions();
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Merchant Dashboard</h1>
      </header>
      
      <main>
        {error && <div className="error-message">Error: {error}</div>}
        
        <div className="dashboard-grid">
          <section className="merchant-section">
            {merchantData ? (
              <MerchantProfile merchant={merchantData} />
            ) : loading ? (
              <div className="loading">Loading merchant data...</div>
            ) : (
              <div className="error-message">Failed to load merchant profile</div>
            )}
          </section>
          
          <section className="transactions-section">
            <div className="transactions-header">
              <h2>Transactions</h2>
              <div className="transactions-controls">
                <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
                <button 
                  className="refresh-button"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="loading">Loading transactions...</div>
            ) : transactions.length > 0 ? (
              <TransactionHistory transactions={transactions} />
            ) : (
              <div className="no-transactions">No transactions found for selected criteria</div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;