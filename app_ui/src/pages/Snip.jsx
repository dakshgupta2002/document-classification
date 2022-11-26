import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Demo.css";
import axios from "axios";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo = () => {
  const [image, setImage] = useState(defaultSrc);
  const [text, setText] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const imageRef = useRef(null);
  const [rows, setRows] = useState([0, 0, 0]);
  const [cols, setCols] = useState([0]);
  const [data, setData] = useState({});
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(100);
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);
  const [activeCellId, setActiveCellId] = useState(null);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };


  const getCropData = async () => {
    let imgData = document.getElementsByClassName('cropper-canvas')[0].getAttribute("style").split(";");
    let cropBoxData = document.getElementsByClassName('cropper-crop-box')[0]?.getAttribute("style")?.split(";");
    // console.log(imgData, imgData[0].split(":"), imgData[1].split(":"), imgData[2].split(":"))
    // console.log({cropperCropData: {
    //   [cropBoxData[0]?.split(":")[0].trim()]: cropBoxData[0]?.split(":")[1].trim(),
    //   [cropBoxData[1]?.split(":")[0].trim()]: cropBoxData[1]?.split(":")[1].trim(),
    //   [cropBoxData[2]?.split(":")[0].trim()]: cropBoxData[2]?.split(":")[1].trim()
    // }
  // })
  console.log(cropBoxData[0]?.split(":")[1].trim())
    if (typeof cropper !== "undefined") {
      // console.log(cropper.getCroppedCanvas().toDataURL())
      const backendUrl = "http://localhost:8000/extract/image";
      setCropData(cropper.getCroppedCanvas().toDataURL());
      await axios
        .post(backendUrl, {
          filename: "image",
          b64: cropper.getCroppedCanvas().toDataURL().split(",").pop(),
        })
        .then((res) => {
          const cropBoxData = cropper.getCropBoxData();
          if (activeCellId !== null) {
            setData({...data, [activeCellId]: {
              text: res?.data?.text,
              top: cropBoxData.top,
              left: cropBoxData.left,
              height: cropBoxData.height,
              width: cropBoxData.width,
              imageData: {
                [imgData[0]?.split(":")[0].trim()]: imgData[0].split(":")[1].trim(),
                [imgData[1]?.split(":")[0].trim()]: imgData[1].split(":")[1].trim(),
                [imgData[2]?.split(":")[0].trim()]: imgData[2].split(":")[1].trim()
              },
              cropperCropData: {
                [cropBoxData[0]?.split(":")[0].trim()]: cropBoxData[0]?.split(":")[1].trim(),
                [cropBoxData[1]?.split(":")[0].trim()]: cropBoxData[1]?.split(":")[1].trim(),
                [cropBoxData[2]?.split(":")[0].trim()]: cropBoxData[2]?.split(":")[1].trim()
              }
            }})
          }
        });
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <div id="highlight" className="relative bg-yellow-100 z-100" style={{top: top, left: left, height: height, width: width }}></div>
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          ref={imageRef}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>

      <div className="px-24 grid grid-cols-2 gap-x-4">
        <div className="flex flex-col items-center">
          <div className="box" style={{ width: "50%", float: "right" }}>
            <div
              className="img-preview"
              style={{ width: "0%", float: "left", height: "0px" }}
            />
          </div>
          <button
            className="w-full py-3 mt-1 bg-blue-500 hover:bg-indigo-500 relative text-white"
            onClick={getCropData}
          >
            Crop Image
          </button>

          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>

        <div
          className="px-4 overflow-scroll h-[80vh] border-2 py-4 bg-off-white rounded-lg shadow-xl"
          style={{
            scrollbarWidth: "0",
          }}
        >
          {rows.map((row, rowIndex) => {
            return (
              <div className="flex flex-row">
                {cols.map((col, colIndex) => {
                  return <FormInput id={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} data={data} setActiveCellId={setActiveCellId} setTop={setTop} setLeft={setLeft} setHeight={setHeight} setWidth={setWidth} />
                })}
              </div>
            );
          })}
          <button
            className="w-full py-3 mt-1 bg-blue-500 hover:bg-indigo-500 relative text-white"
            onClick={() => setRows([...rows, 0])}
          >
            Add Row
          </button>
          <button
            className="w-full py-3 mt-1 bg-blue-500 hover:bg-indigo-500 relative text-white"
            onClick={() => setCols([...cols, 0])}
          >
            Add Col
          </button>
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default Demo;
