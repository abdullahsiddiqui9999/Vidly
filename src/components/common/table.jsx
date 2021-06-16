import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = (props) => {
  const { columns, onSort, sortColumn, movies } = props;

  return (
    <React.Fragment>
      <table className="table table-striped">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={movies} columns={columns} />
      </table>
    </React.Fragment>
  );
};

export default Table;
