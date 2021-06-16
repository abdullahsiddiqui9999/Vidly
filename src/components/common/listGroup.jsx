import React from "react";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect, textProperty, valueProperty } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={`list-group-item ${item === selectedItem ? "active" : ""}`}
          onClick={() => onItemSelect(item)}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
