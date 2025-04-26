import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:8000/api'; // For Android emulator

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};