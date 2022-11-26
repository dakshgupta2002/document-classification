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
        console.log(data[id])
        props.setTop(data[id]?.top);
        props.setLeft(data[id]?.left);
        props.setHeight(data[id]?.height);
        props.setWidth(data[id]?.width);
        document.getElementsByClassName('cropper-canvas')[0].setAttribute("style", `width: ${data[id]?.imageData.width}; height: ${data[id]?.imageData.height}; transform: ${data[id]?.imageData.transform};`)
        // document.getElementsByClassName('cropper-crop-box')[0].setAttribute("style", `width: ${data[id]?.cropperCropData?.width}; height: ${data[id]?.cropperCropData?.height}; transform: ${data[id]?.cropperCropData1?.transform};`)
      }}
    />
  );
}
