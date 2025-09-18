import { API_ENDPOINTS, DEFAULT_PAGE_SIZE } from '../constants/index.js';
import { apiClient } from './apiClient.js';

const normalisePagination = (payload = {}, fallback = {}) => {
  const data = payload.data ?? payload;
  const items =
    data.items ||
    data.content ||
    data.results ||
    data.rows ||
    [];
  const page = data.page ?? data.pageNumber ?? data.currentPage ?? fallback.page ?? 0;
  const size = data.size ?? data.pageSize ?? fallback.size ?? DEFAULT_PAGE_SIZE;
  const totalItems =
    data.totalItems ??
    data.totalElements ??
    data.totalRecords ??
    data.total ??
    items.length;
  const totalPages =
    data.totalPages ??
    data.totalPage ??
    (size ? Math.ceil(totalItems / size) : 1);

  return {
    items,
    page,
    size,
    totalItems,
    totalPages
  };
};

export const fetchConsultations = async ({ page = 0, size = DEFAULT_PAGE_SIZE, token, projectName }) => {
  if (!projectName) {
    throw new Error("projectName is required để gọi API consultations");
  }

  const response = await apiClient(API_ENDPOINTS.consultations, {
    method: 'GET',
    token,
    params: {
      projectName,
      page,
      size
    }
  });

  return normalisePagination(response, { page, size });
};

export const deleteConsultation = async ({ id, token }) => {
  if (!id) {
    throw new Error('id is required để xóa consultation');
  }

  return apiClient(API_ENDPOINTS.consultationDelete(id), {
    method: 'PUT',
    token
  });
};