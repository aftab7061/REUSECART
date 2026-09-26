// components/Pagination.jsx
// Simple numbered pagination control
import './Pagination.css';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) pageNumbers.push(i);

  return (
    <div className="pagination">
      <button
        className="btn btn-outline btn-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Prev
      </button>

      <div className="pagination-numbers">
        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`pagination-num ${num === page ? 'active' : ''}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className="btn btn-outline btn-sm"
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
