import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '../../constants/index.js';
import { useAuth } from '../../hooks/useAuth.js';
import { deleteConsultation, fetchConsultations } from '../../services/consultationService.js';
import { formatDate } from '../../utils/formatDate.js';
import { useProject } from '../../context/ProjectContext.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import styles from './ConsultationList.module.css';

const getFieldValue = (item, keys, fallback = '---') => {
  const key = keys.find((field) => item[field] !== undefined && item[field] !== null);
  return key ? item[key] : fallback;
};

const ConsultationList = () => {
  const { token } = useAuth();
  const { projectName } = useProject(); 
  const [page, setPage] = useState(0);
  const [size] = useState(DEFAULT_PAGE_SIZE);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingIds, setDeletingIds] = useState([]);

  const loadConsultations = useCallback(async () => {
    if (!token || !projectName) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchConsultations({ page, size, token, projectName });
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
  }, [page, size, token, projectName]);

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
        const demand = getFieldValue(item, ['demand', 'requirement', 'note', 'consultNeed', 'description']);
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

        const itemId = item.id || item.consultationId;

        return {
          id: itemId || `${page}-${index}`,
          canDelete: Boolean(itemId),
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

  const handleDelete = useCallback(
    async (id) => {
      if (!id || !token) {
        return;
      }

      const confirmed =
        typeof window === 'undefined' || window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?');
      if (!confirmed) {
        return;
      }

      setDeletingIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

      try {
        await deleteConsultation({ id, token });
        await loadConsultations();
      } catch (err) {
        const message = err.message || 'Không thể xóa khách hàng';
        if (typeof window !== 'undefined') {
          window.alert(message);
        }
        setError(message);
      } finally {
        setDeletingIds((prev) => prev.filter((itemId) => itemId !== id));
      }
    },
    [token, loadConsultations]
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
              <th>Thao tác</th>
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
              rows.map((row) => {
                const isDeleting = deletingIds.includes(row.id);
                return (
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
                      <div className={styles.actions}>
                        {row.isNew && (
                          <span className={styles.newIndicator} title="Khách hàng mới" aria-label="Khách hàng mới" />
                        )}
                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={() => handleDelete(row.id)}
                          disabled={!row.canDelete || loading || isDeleting}
                        >
                          {isDeleting ? 'Đang xóa...' : 'Xóa'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
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