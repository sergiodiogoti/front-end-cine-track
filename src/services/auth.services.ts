
import type { LoginRequest, LoginResponse } from '@/types/Auth';
import { api } from './api';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post('/auth/login', data);
  return response.data;
}
