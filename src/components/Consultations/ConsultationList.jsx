import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '../../constants/index.js';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchConsultations } from '../../services/consultationService.js';
import { formatDate } from '../../utils/formatDate.js';
import Pagination from '../Pagination/Pagination.jsx';
import styles from './ConsultationList.module.css';

const getFieldValue = (item, keys, fallback = '---') => {
  const key = keys.find((field) => item[field] !== undefined && item[field] !== null);
  return key ? item[key] : fallback;
};

const ConsultationList = () => {
  const { token } = useAuth();
  const [page, setPage] = useState(0);
  const [size] = useState(DEFAULT_PAGE_SIZE);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadConsultations = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchConsultations({ page, size, token });
      setItems(response.items);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (err) {
      setItems([]);
      setTotalPages(0);
      setTotalItems(0);
      setError(err.message || 'Không thể tải danh sách khách hàng');
    } finally {
      setLoading(false);
    }
  }, [page, size, token]);

  useEffect(() => {
    loadConsultations();
  }, [loadConsultations]);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const rows = useMemo(
    () =>
      items.map((item, index) => {
        const customerName = getFieldValue(item, ['fullName', 'name', 'customerName'], 'Khách hàng');
        const phoneNumber = getFieldValue(item, ['phoneNumber', 'phone', 'mobile', 'contactNumber']);
        const demand = getFieldValue(item, ['demand', 'requirement', 'note', 'message', 'description']);
        const createdAt = getFieldValue(item, ['createdAt', 'createdDate', 'createdTime', 'created_on', 'created']);
        const checked = getFieldValue(item, ['isCheck', 'ischeck', 'checked', 'is_view'], true);
        const isNew = typeof checked === 'boolean' ? !checked : checked === 'false';
        const initials = customerName
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
          .toUpperCase();

        return {
          id: item.id || item.consultationId || `${page}-${index}`,
          customerName,
          phoneNumber,
          demand,
          createdAt: formatDate(createdAt),
          isNew,
          initials
        };
      }),
    [items, page]
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2>Thông tin khách hàng</h2>
          <p>{`Tổng cộng ${totalItems} khách hàng`}</p>
        </div>
        <button type="button" className={styles.refreshButton} onClick={loadConsultations} disabled={loading}>
          Làm mới
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Số điện thoại</th>
              <th>Nhu cầu</th>
              <th>Ngày đăng ký</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  {error || 'Chưa có dữ liệu khách hàng'}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className={styles.customerCell}>
                      <div className={styles.avatar}>{row.initials || 'KH'}</div>
                      <div>
                        <p className={styles.customerName}>{row.customerName}</p>
                        <p className={styles.customerEmail}>{row.phoneNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td>{row.phoneNumber}</td>
                  <td>
                    <span className={styles.demand}>{row.demand}</span>
                  </td>
                  <td>{row.createdAt}</td>
                  <td className={styles.statusCell}>
                    {row.isNew && <span className={styles.newIndicator} title="Khách hàng mới" aria-label="Khách hàng mới" />}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {loading && <div className={styles.loadingOverlay}>Đang tải...</div>}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} disabled={loading} />
    </section>
  );
};

export default ConsultationList;