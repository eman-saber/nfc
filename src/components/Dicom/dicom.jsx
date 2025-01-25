import React, { useRef, useEffect } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

// Configure cornerstone-wado-image-loader
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// Initialize cornerstone-tools
// cornerstoneTools.init();

const Dicom = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const element = viewerRef.current;

    // Initialize cornerstone
    cornerstone.enable(element);

    // Initialize tools and set active tool
    cornerstoneTools.addTool(cornerstoneTools.PanTool);
    cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });

    return () => {
      cornerstone.disable(element);
    //   cornerstoneTools.clearToolState(element);
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      cornerstone.loadImage(imageId).then((image) => {
        cornerstone.displayImage(viewerRef.current, image);
      }).catch((error) => {
        console.error("Error loading DICOM image:", error);
      });
    }
  };

  return (
    <div style={{padding:"auto" , margin:"auto"}}>
      <input type="file" accept=".dcm" onChange={handleFileUpload} style={{padding:"5px" , margin:"5px"}}/>
      <div
        ref={viewerRef}
        style={{ width: "1000px", height: "512px", backgroundColor: "black" }}
      ></div>
    </div>
  );
};

export default Dicom;
