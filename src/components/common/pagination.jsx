import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = itemsCount / pageSize;
    if (pagesCount <= 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map(p => (
                    <li
                        key={p}
                        className={
                            currentPage === p ? "page-item active" : "page-item"
                        }
                    >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            className="page-link"
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
