import React, { Component } from "react";

const Like = (props) => {
  return (
    <i
      onClick={props.onClick}
      className={`fa fa-heart${props.liked ? "" : "-o"}`}
      aria-hidden="true"
      style={{ cursor: "pointer" }}></i>
  );
};

export default Like;
