export interface Node {
  nodeId: string;
  name: string;
  regionCode: string;
  regionName: string;
  protocol: string;
  visibilityLevel: string;
  host: string;
  port: number;
  latency: number;
  load: number;
  status: string;
}

export interface Plan {
  planId: string;
  name: string;
  price: number;
  durationDays: number;
  features: string;
  popular: boolean;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

const TOKEN_KEY = 'sparklink-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem('sparklink-auth', 'true');
  window.dispatchEvent(new CustomEvent('sparklink-auth-change'));
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('sparklink-auth');
  window.dispatchEvent(new CustomEvent('sparklink-auth-change'));
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers,
      ...options,
    });
    return await res.json();
  } catch {
    return { code: -1, message: 'Network error', data: null };
  }
}

async function getNodes(): Promise<Node[]> {
  const res = await request<{ nodes: Node[]; total: number }>('/api/v1/nodes/list');
  if (res.code === 0 && res.data) {
    return res.data.nodes.map(n => ({ ...n, status: 'online' }));
  }
  return [];
}

async function getPlans(): Promise<Plan[]> {
  const res = await request<{ plans: Plan[] }>('/api/v1/subscription/plans');
  if (res.code === 0 && res.data) {
    return res.data.plans;
  }
  return [];
}

async function sendCode(phone: string): Promise<ApiResponse<{ expiresAt: string }>> {
  return request('/api/v1/auth/sendcode', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

async function login(phone: string, code: string): Promise<ApiResponse<{ token: string; userId?: number }>> {
  return request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone, code }),
  });
}

export const api = {
  getNodes,
  getPlans,
  sendCode,
  login,
};
