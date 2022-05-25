import React, { useRef, useState } from 'react';

interface Props {
  videoQuestion: string;
  videos: any;
  videoUp: any;
  setIsAVideoUp: any;
  setVideos: any;
}

const Video: React.FC<Props> = ({ videoQuestion, videos, videoUp, setIsAVideoUp, setVideos }) => {
  const [recording, setRecording] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const recordedVideo = useRef<HTMLVideoElement>(null);
  // @ts-ignore 
  let mediaRecorder = useRef<any>(null);
  let recordedBlobs = useRef<any>([0,0,0,0]);

  const constraints = {
    audio: false,
    video: { width: 640, height: 300 },
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

  const handleDataAvailable = (event: any) => {
    console.log('handleDataAvailable: ', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.current.splice(videoUp.id, 0, [event.data]);
    }
  };

  const startRecording = async () => {
    await initiateStream();
    try {
      // @ts-ignore 
      mediaRecorder.current = new MediaRecorder((window as any).stream);
    } catch (e) {
      console.error('Error creando MediaRecorder: ', e);
    }
    setRecording(true);
    mediaRecorder.current?.start();
    console.log('Inicio el video');
  };

  const playRecorded = () => {
    console.log(recordedBlobs.current)
    let superBuffer = new Blob(recordedBlobs.current[videoUp.id], {
      type: 'video/webm;codecs=vp9,opus',
    });
    if (recordedVideo.current !== null) {
      recordedVideo.current.src = window.URL.createObjectURL(superBuffer);
      recordedVideo.current.controls = true;
      (recordedVideo as any).current.play();
    } else {
      console.error('la cagué');
    }
  };

  const stopRecording = () => {
    mediaRecorder.current.ondataavailable = handleDataAvailable;
    mediaRecorder.current.stop();
    console.log('Termino el video');
    setRecording(false);
  };

  const clickStart = () => {
    console.log("clickStart", videoUp.id)
    if (recording === false) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const nextVideo = () => {
    if (videoUp.id === 3) {
      setIsAVideoUp({ is: true, id: 0 });
    } else {
    setIsAVideoUp({ is: true, id: videoUp.id + 1 });
    }
    (recordedVideo.current as any).pause();
  };

  const previousVideo = () => {
    if (videoUp.id === 0) {
      setIsAVideoUp({ is: true, id: 3 });
    } else {
      setIsAVideoUp({ is: true, id: videoUp.id - 1 });
    }
    (recordedVideo.current as any).pause();
  };

  return (
    <div className="video_container">
      <h1>{videoQuestion}</h1>
      <video className="main_video" ref={video} autoPlay playsInline></video>
      <video
        className="recorded_video"
        ref={recordedVideo}
        autoPlay
        playsInline
        loop></video>
      <div className="buttons">
        <button className="start" onClick={() => clickStart()}>
          {recording ? 'parar' : 'grabar'}
        </button>
        <button onClick={() => playRecorded()}>Reproducir</button>
        <button className="atras" onClick={previousVideo}>
          Atrás
        </button>
        <button className="siguiente" onClick={nextVideo}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Video;
