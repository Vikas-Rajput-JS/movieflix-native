import { UserType } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiClient from "./apiClient";
import { Platform } from "react-native";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};
export interface LoginData {
  email: string;
  password: string;
}
let apiUrl = process.env.EXPO_PUBLIC_API_KEY;
if (Platform.OS == "ios") {
  apiUrl = process.env.EXPO_PUBLIC_IOS_API_KEY;
}
export const loginService = async (data: LoginData): Promise<any> => {
  try {
    console.log(apiUrl, "============apiUrl");
    const token = await AsyncStorage.getItem("token");
    let request: any = await apiClient.post(`${apiUrl}/auth/login`, data);
    console.log(request);
    if (request.status != 200) {
      return request;
    }
    if (request.status == 200) {
      await AsyncStorage.setItem("token", request.data.tokens.access.token);
    }
    return request.data;
  } catch (error: any) {
    console.log(JSON.stringify(error), "============errors");
    return Promise.reject(error);
  }
};
export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await apiClient.get(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (response?.status != 200) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  console.log(response, "==============api response");
  const data = response?.data;

  return data?.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
