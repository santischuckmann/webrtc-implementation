import React, { useEffect, useRef, useState } from 'react';

interface Props {
  videoQuestion: string;
  videoUp: any;
  setIsAVideoUp: any;
}


const Video: React.FC<Props> = ({ videoQuestion, videoUp, setIsAVideoUp }) => {
  const [recording, setRecording] = useState(false);
  const [completed, setCompleted] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const recordedVideo = useRef<HTMLVideoElement>(null);
  let mediaRecorder = useRef<any>(null);
  let recordedBlobs = useRef<any>([0, 0, 0, 0]);
  let sendButton = useRef<HTMLButtonElement>(null);

  const constraints = {
    audio: {
      echoCancellation: true,
    },
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
      recordedBlobs.current.splice(videoUp.id, 1, [event.data]);
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
    countMinutes();
    console.log('Inicio el video');
  };

  const playRecorded = () => {
    console.log(recordedBlobs.current);
    let superBuffer = new Blob(recordedBlobs.current[videoUp.id], {
      type: 'video/webm;codecs=vp9,opus',
    });
    if (recordedVideo.current !== null) {
      recordedVideo.current.src = window.URL.createObjectURL(superBuffer);
      recordedVideo.current.controls = true;
      (recordedVideo as any).current.play();
    } else {
      throw new Error ("video is null");
    }
  };

  const stopRecording = () => {
    mediaRecorder.current.ondataavailable = handleDataAvailable;
    mediaRecorder.current.stop();
    setRecording(false);
    setCompleted(completed + 1);
  };

  const clickStart = () => {
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
  };

  const checkSendReady = () => {
    if (completed === 4) {
      sendButton.current?.classList.remove('not_showing');
      sendButton.current?.classList.add('showing');
    }
  };

  const countMinutes = () => {
      setTimeout(() => {
        stopRecording();
      }, 60000 * 2)
  }

  useEffect(() => {
    if (recording == true) {
      countMinutes()
    }
  }, [videoUp.id])

  useEffect(() => {
    (recordedVideo.current as any).pause();
    checkSendReady();
  }, [completed]);

  return (
    <div className="video_container">
      <h1>{videoQuestion}</h1>
      <h3>Maximo de dos minutos por video</h3>
      <h3>Puede reintentar las veces que usted quiera</h3>
      <video 
        className="main_video" 
        ref={video} 
        autoPlay 
        playsInline>
        </video>
      <video
        className="recorded_video"
        ref={recordedVideo}
        autoPlay
        playsInline
        loop></video>
      <div className="buttons">
        <button className="start" onClick={() => clickStart()}>
          {recording ? 'Stop' : 'Record'}
        </button>
        <button onClick={() => playRecorded()}>Reproducir</button>
        <button className="Previous" onClick={previousVideo}>
          Atrás
        </button>
        <button className="Next" onClick={nextVideo}>
          Siguiente
        </button>
        <button ref={sendButton} className="not_showing">
          Send
        </button>
      </div>
    </div>
  );
};

export default Video;
