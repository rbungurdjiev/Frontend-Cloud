import axios from 'axios';

const API_BASE_URL = 'https://appointments-server-1-8e83aec0397d.herokuapp.com/api';

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;    
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Add other API functions as needed
