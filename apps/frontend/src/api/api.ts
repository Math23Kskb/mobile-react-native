import axios from 'axios';
import Constants from 'expo-constants'; // Importa o expo-constants

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

const api = axios.create({
  baseURL: apiUrl,
});

export default api;