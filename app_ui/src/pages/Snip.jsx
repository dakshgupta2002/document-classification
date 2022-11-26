import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Demo.css";
import axios from "axios";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo = () => {
  const [image, setImage] = useState(defaultSrc);
  const [text, setText] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const imageRef = useRef(null);
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
    if (typeof cropper !== "undefined") {
      // console.log(cropper.getCroppedCanvas().toDataURL())
      const backendUrl = "http://localhost:8000/extract/image"
      setCropData(cropper.getCroppedCanvas().toDataURL());
      await axios.post(backendUrl, { filename: "image", b64: cropper.getCroppedCanvas().toDataURL().split(',').pop() }).then(
        res => (
          // uploadBytes(imageRef, document).then(() => {
          //   console.log(document.name)
          //   // uploadToFirestore(res.data.class);
          //   toast.success('Document uploaded');
          // })
          setText(res?.data?.text)
          )
      )
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
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
      <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          {/* <h1>Preview</h1> */}
          <div
            className="img-preview"
            style={{ width: "0%", float: "left", height: "0px" }}
          />
        </div>
        <div
          className="box"
          style={{ width: "0%", float: "right", height: "0px" }}
        >
          <h1>
            {/* <span>Crop</span> */}
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
            {text}
          </h1>
          <img style={{ width: "0%" }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default Demo;
