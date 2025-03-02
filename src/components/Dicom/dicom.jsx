// import React, { useRef, useEffect } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // Configure cornerstone-wado-image-loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// // Initialize cornerstone-tools
// // cornerstoneTools.init();

// const Dicom = () => {
//   const viewerRef = useRef(null);

//   useEffect(() => {
//     const element = viewerRef.current;

//     // Initialize cornerstone
//     cornerstone.enable(element);

//     // Initialize tools and set active tool
//     cornerstoneTools.addTool(cornerstoneTools.PanTool);
//     cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });

//     return () => {
//       cornerstone.disable(element);
//     //   cornerstoneTools.clearToolState(element);
//     };
//   }, []);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
//       cornerstone.loadImage(imageId).then((image) => {
//         cornerstone.displayImage(viewerRef.current, image);
//       }).catch((error) => {
//         console.error("Error loading DICOM image:", error);
//       });
//     }
//   };

//   return (
//     <div style={{padding:"auto" , margin:"auto"}}>
//       <input type="file" accept=".dcm" onChange={handleFileUpload} style={{padding:"5px" , margin:"5px"}}/>
//       <div
//         ref={viewerRef}
//         style={{ width: "1000px", height: "512px", backgroundColor: "black" }}
//       ></div>
//     </div>
//   );
// };

// export default Dicom;
import React, { useState } from 'react';
import dicomParser from 'dicom-parser';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

const DicomViewer = () => {
    const [dicomData, setDicomData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const byteArray = new Uint8Array(arrayBuffer);

            // Parse DICOM metadata
            const dataSet = dicomParser.parseDicom(byteArray);
            const patientName = dataSet.string('x00100010') || 'N/A';
            const studyDate = dataSet.string('x00080020') || 'N/A';
            const modality = dataSet.string('x00080060') || 'N/A';

            setDicomData({ patientName, studyDate, modality });

            // Set up cornerstone image loader
            cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

            const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
            cornerstone.loadImage(imageId).then((image) => {
                const canvas = document.getElementById('dicomCanvas');
                cornerstone.enable(canvas);
                cornerstone.displayImage(canvas, image);
            }).catch(console.error);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h2>Upload DICOM Image</h2>
            <input type="file" accept=".dcm" onChange={handleFileChange} />

            {dicomData && (
                <div>
                    <p><strong>Patient Name:</strong> {dicomData.patientName}</p>
                    <p><strong>Study Date:</strong> {dicomData.studyDate}</p>
                    <p><strong>Modality:</strong> {dicomData.modality}</p>
                </div>
            )}

            <canvas id="dicomCanvas" style={{ width: 512, height: 512, border: '1px solid black' }} />
        </div>
    );
};

export default DicomViewer;