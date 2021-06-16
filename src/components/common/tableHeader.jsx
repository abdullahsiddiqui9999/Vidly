import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    let sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      if (sortColumn.order === "asc") {
        sortColumn.order = "desc";
      } else if (sortColumn.order === "desc") {
        sortColumn = { path: "title", order: "asc" };
      }
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (sortColumn.path === column.path) {
      if (sortColumn.order === "asc") {
        return <i className="fa fa-arrow-down" aria-hidden="true"></i>;
      } else {
        return <i className="fa fa-arrow-up" aria-hidden="true"></i>;
      }
    }
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              style={{ cursor: "pointer" }}>
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
