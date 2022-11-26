import React, { useState, useEffect } from "react";

export default function FormInput(props) {
  let rowIndex = props.rowIndex
  let colIndex = props.colIndex
  let id = rowIndex + "-" + colIndex

  let data = props.data;

  return (
    <input
      value={data[id]?.text}
      type="text"
      className="w-40 h-10 border-solid border-2"
      key={props.id}
      onClick={(e) => {
        e.preventDefault();
        props.setActiveCellId(props.id);
      }}
      id={props.id}
      onContextMenu={(e) => {
        e.preventDefault();
        props.setTop(data[id]?.top);
        props.setLeft(data[id]?.left);
        props.setHeight(data[id]?.height);
        props.setWidth(data[id]?.width);
        console.log(`Previewing ${props.id}`);
      }}
    />
  );
}
