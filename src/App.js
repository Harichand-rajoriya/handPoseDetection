// install depencencies done
//inport dependencies done
//setup webcam and canvas done
// define refrences to those
// load handpose
// drawing utilities from tensorflow
// draw functions


import * as HandPose from '@tensorflow-models/handpose';
import React, { useRef } from 'react';
//import * as tf from "@tensorflow/tfjs";
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const webcamRef = useRef(null);
 // const canvasRef = useRef(null); 

  const runHandpose = async() => {
    const net  = await HandPose.load();
    console.log("handpose model Loaded.");
    setInterval(() => {
      detect(net) 
    }, 100)
  };
  runHandpose();
  const detect = async(net) => {
    // check data is available
    if(
      typeof webcamRef.current !=="undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.videoHeight;

      // set video  height  and width 

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // set canvas height and width
     // canvasRef.current.video.width = videoWidth;
      //canvasRef.current.video.height = videoHeight;
     
      // make detections 
      const hand =  await net.estimateHand(video);
      console.log(hand);
    }
  };

  return (
   <div className='App'>
    <header className='App-headrer'>
      <Webcam
      ref = {webcamRef}
      style = {{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right:0,
        textAlign: "center",
        zindex:9,
        height:480,
        width:840
      }}>
      </Webcam>

      {/* <Canvas 
      ref={canvasRef}
      style = {{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right:0,
        textAlign: "center",
        zindex:9,
        height:480,
        width:640
      }}></Canvas> */}

    </header>

   </div>
  );
}

export default App;
