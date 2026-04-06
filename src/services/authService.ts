import type { User } from '../types';

const API_URL = 'http://localhost:5000/users';

export const authService = {
  async login(email: string): Promise<User | null> {
    const response = await fetch(`${API_URL}?email=${email}`);
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
  },

  async register(username: string, email: string): Promise<User> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, role: 'gamer' }) 
    });
    return await response.json();
  }
};