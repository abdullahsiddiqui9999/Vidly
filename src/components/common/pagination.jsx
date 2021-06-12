import React, { Component } from "react";

const Pagination = (props) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {[...Array(props.pages + 1).keys()].splice(1).map((page) => (
          <li
            key={page}
            className={`page-item ${props.page === page ? "active" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => props.handlePageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
