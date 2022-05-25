import React, { useRef, useState } from 'react';

interface Props {
  videoQuestion: string;
  selectVideo(): void;
  videos: object;
  setVideos: any;
}

const Video: React.FC<Props> = ({ videoQuestion, selectVideo }) => {
  const [recording, setRecording] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const recordedVideo = useRef<HTMLVideoElement>(null);
  let mediaRecorder = useRef<any>(null);
  let recordedBlobs = useRef<any>(null);

  const constraints = {
    audio: false,
    video: { width: 400, height: 200 },
  };

  const initiateStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (video.current === null) {
      console.log('video current is null');
    } else {
      video.current.srcObject = stream;
      (window as any).stream = stream;
    }
  };

  const handleDataAvailable = (event:any) => {
    console.log("handleDataAvailable: " , event)
    if (event.data && event.data.size > 0) {
      recordedBlobs.current.push(event.data)
    }
  }

  const startRecording = async () => {
    recordedBlobs.current = []
    await initiateStream();
    try {
      mediaRecorder.current = new MediaRecorder((window as any).stream);
    } catch (e) {
      console.error('Error creando MediaRecorder: ', e);
    }
    setRecording(true);
    mediaRecorder.current?.start();
    console.log('Inicio el video');
  };

  const playRecorded = () => {
    let superBuffer = new Blob(recordedBlobs.current, {type: 'video/webm;codecs=vp9,opus'})
    if (recordedVideo.current !== null) {
      recordedVideo.current.src = window.URL.createObjectURL(superBuffer);
      recordedVideo.current.controls = true;
      (recordedVideo as any).play();
    } else {
      console.error("la cagué")
    }
  }

  


  const stopRecording = () => {
    mediaRecorder.current.ondataavailable = handleDataAvailable;
    mediaRecorder.current.stop();
    console.log('Termino el video');
    setRecording(false);
  };

  const clickStart = () => {
    if (recording === false) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div className="video_container">
      <h1>{videoQuestion}</h1>
      <video className = "main_video" ref={video} autoPlay playsInline></video>
      <video className = "recorded_video" ref={recordedVideo} autoPlay playsInline loop></video>
      <div className="buttons">
        <button className = "start" onClick={() => clickStart()}>{recording ? 'parar' : 'grabar'}</button>
        <button onClick={() => playRecorded()}>Reproducir</button>
        <button className='atras'>Atrás</button>
        <button className='siguiente' onClick={selectVideo}>Siguiente</button>
      </div>
    </div>
  );
};

export default Video;
