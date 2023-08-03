import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, data);
    // console.log(response.data.user); // User data received from the backend
    // console.log(response.data.token); // Token received from the backend
    return response.data; // Return the entire response object if needed
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data); // Error response from the server
      console.error(error.response.status); // HTTP status code (e.g., 400)
      console.error(error.response.headers); // Response headers from the server
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error', error.message);
    }
    throw error;
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, data);
    console.log(response.data.user); // User data received from the backend
    console.log(response.data.token); // Token received from the backend
    return response.data; // Return the entire response object if needed
  } catch (error) {
    if (error.response) {
      // The request was made, and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data); // Error response from the server
      console.error(error.response.status); // HTTP status code (e.g., 400)
      console.error(error.response.headers); // Response headers from the server
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error', error.message);
    }
    throw error;
  }
};


export const createNote = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/note`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the token in the request headers
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateNote = async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/note/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the token in the request headers
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the token in the request headers
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the token in the request headers
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };