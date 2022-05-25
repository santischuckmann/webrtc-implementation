import React, { useRef, useState } from 'react';

interface Props {
  videoQuestion: string;
  getNextQuestion(): void;
  videos: object;
  setVideos: any;
}

const Video: React.FC<Props> = ({ videoQuestion, getNextQuestion }) => {
  const [recording, setRecording] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const recordedVideo = useRef<HTMLVideoElement>(null);
  let mediaRecorder = useRef<any>(null);

  const constraints = {
    audio: false,
    video: { width: 600, height: 400 },
  };

  const initiateStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    (window as any).stream = stream;
    if (video.current == null) {
      console.log('video current is null');
    } else {
      video.current.srcObject = stream;
    }
  };

  const startRecording = async () => {
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

  const stopRecording = () => {
    mediaRecorder.current.stop();
    console.log('Termino el video');
  };

  const clickStart = () => {
    if (recording === false) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div className="videoContainer">
      <h1>{videoQuestion}</h1>
      <video ref={video} autoPlay playsInline></video>
      <button onClick={() => clickStart()}>{recording ? 'parar' : 'grabar'}</button>
      <video ref={recordedVideo} playsInline loop></video>
      {/* <button onClick={}>Atrás</button> */}
      <button onClick={getNextQuestion}>Siguiente</button>
    </div>
  );
};

export default Video;
