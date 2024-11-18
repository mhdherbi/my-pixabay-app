import axios from 'axios';

export const login = async (username: string, password: string): Promise<string> => {
  if (username === 'admin' && password === 'admin') {
    // Return token Pixabay (contoh)
    return 'YOUR_PIXABAY_API_TOKEN';
  } else {
    throw new Error('Invalid credentials');
  }
};
