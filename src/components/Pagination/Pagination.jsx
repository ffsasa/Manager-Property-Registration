import PropTypes from 'prop-types';
import styles from './Pagination.module.css';

const buildPages = (currentPage, totalPages) => {
  if (totalPages <= 1) return [];

  const pages = [];
  const lastIndex = totalPages - 1;

  const addPage = (page) => {
    pages.push({ type: 'page', value: page });
  };

  const addEllipsis = (key) => {
    pages.push({ type: 'ellipsis', key });
  };

  if (totalPages <= 7) {
    for (let page = 0; page < totalPages; page += 1) {
      addPage(page);
    }
    return pages;
  }

  addPage(0);

  if (currentPage > 2) {
    addEllipsis('left');
  }

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(lastIndex - 1, currentPage + 1);
  for (let page = start; page <= end; page += 1) {
    addPage(page);
  }

  if (currentPage < lastIndex - 2) {
    addEllipsis('right');
  }

  addPage(lastIndex);

  return pages;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,   // ✅ default parameter
}) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const handleChange = (page) => {
    if (page < 0 || page >= totalPages || page === currentPage || disabled) return;
    onPageChange(page);
  };

  const pages = buildPages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.navButton}
        onClick={() => handleChange(currentPage - 1)}
        disabled={disabled || currentPage === 0}
      >
        Trước
      </button>

      <ul className={styles.pages}>
        {pages.map((pageItem) =>
          pageItem.type === 'page' ? (
            <li key={pageItem.value}>
              <button
                type="button"
                onClick={() => handleChange(pageItem.value)}
                className={`${styles.pageButton} ${
                  currentPage === pageItem.value ? styles.active : ''
                }`}
                disabled={disabled}
              >
                {pageItem.value + 1}
              </button>
            </li>
          ) : (
            <li key={`ellipsis-${pageItem.key}`} className={styles.ellipsis}>
              &hellip;
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className={styles.navButton}
        onClick={() => handleChange(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages - 1}
      >
        Sau
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Pagination;
