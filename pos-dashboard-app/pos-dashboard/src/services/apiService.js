import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.78:8018';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const fetchMerchantData = async (merchantId) => {
  try {
     const response = await api.get(`/api/merchant/${merchantId}`);
    if (response.statusText != 'OK') {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.data;
  } catch (error) {
    console.error('Error fetching merchant data:', error);
    throw error;
  }
};

export const fetchTransactions = async (merchantId, startDate = null, endDate = null) => {
    try {
      const params = { merchant_id: merchantId };
      
      if (startDate) {
        params.start_date = startDate;
      }
      
      if (endDate) {
        params.end_date = endDate;
      }
      
      const response = await api.get('/api/merchant/transactions', { params });
      console.log('resp', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error.response?.data || error.message;
    }
  };