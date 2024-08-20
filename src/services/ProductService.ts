import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/products';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  cover_image: string;
  sub_images: string[];
  sizes: string[];
  quantity: number;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  }
  catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    return null;
  }
};



