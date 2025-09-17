import { API_BASE_URL } from '../constants/index.js';

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    query.append(key, value);
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

export const apiClient = async (
  endpoint,
  { method = 'GET', headers = {}, body, token, params } = {}
) => {
  const url = `${API_BASE_URL}${endpoint}${buildQueryString(params)}`;
  const config = {
    method,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers
    }
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined && body !== null) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    const error = new Error(errorPayload?.message || 'Yêu cầu không thành công');
    error.status = response.status;
    error.payload = errorPayload;
    throw error;
  }

  return parseResponse(response);
};