import React from 'react';
import "../css/pagination.css"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="pagination">
            {pageNumbers.map((pageNumber) => (
                <button key={pageNumber} className={pageNumber === currentPage ? 'active' : ''} onClick={() => onPageChange(pageNumber)}>
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default Pagination;