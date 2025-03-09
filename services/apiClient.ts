import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create a new Axios instance with custom configuration
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your base API URL (e.g., 'http://localhost:4001/v1')
  timeout: 10000, // Set a default timeout (optional)
  headers: {
    "Content-Type": "application/json", // Set default headers (optional)
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // This function will be called before sending the request
    // You can modify the request config here (e.g., add authentication headers)
    const token = await AsyncStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request Interceptor:", config); // Log the config for debugging
    return config;
  },
  (error) => {
    // Handle request errors here
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // This function will be called when a response is received
    // You can process the response data here (e.g., transform data, handle success)

    console.log("Response Interceptor:", response); // Log the response for debugging
    return response; // Return the response to the calling function
  },
  (error) => {
    // Handle response errors here (e.g., handle specific error codes, redirect to login)

    console.error("Response Interceptor Error:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);

      if (error.response.status === 401) {
        // Example: Redirect to login if unauthorized
        // window.location.href = '/login';
        console.log("Unauthorized: Redirecting to login");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No Response Received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.response.data); // Reject the promise to propagate the error
  }
);

export default apiClient;
