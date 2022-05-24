import React, { useRef } from 'react';

interface Props {
  videoQuestion: string;
  getNextQuestion(): void;
}

const Video: React.FC<Props> = ({ videoQuestion, getNextQuestion }) => {
  const video = useRef<HTMLVideoElement>(null);
  const constraints = {
    audio: false,
    video: true,
  };

  const initiateStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (video.current == null) {
      console.log('video current is null');
    } else {
      video.current.srcObject = stream;
    }
  };
  return (
    <div className="videoContainer">
      <h1>{videoQuestion}</h1>
      <video ref={video} autoPlay playsInline></video>
      <button onClick={getNextQuestion}>Siguiente video</button>
      <button onClick={() => initiateStream()}>Grabar</button>
    </div>
  );
};

export default Video;
