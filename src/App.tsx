import React, { useState } from 'react';

import Screenshot from './Screenshot';
import Video from './Video';
import { videoNames } from './videoNames';

interface StateOfVideos {
  video0: {
    completed?: boolean;
    time?: number;
  };
  video1: {
    completed?: boolean;
    time?: number;
  };
  video2: {
    completed?: boolean;
    time?: number;
  };
  video3: {
    completed?: boolean;
    time?: number;
  };
}

function App() {
  const [stateOfVideos, setStateOfVideos] = useState<StateOfVideos>({
    video0: {
      completed: false,
      time: 0,
    },
    video1: {
      completed: false,
      time: 0,
    },
    video2: {
      completed: false,
      time: 0,
    },
    video3: {
      completed: false,
      time: 0,
    },
  });
  const [isAVideoUp, setIsAVideoUp] = useState({
    is: false,
    id: 0,
  });

  const handleQuestionSelected = (id: number) => {
    setIsAVideoUp({ is: true, id: id });
  };
  
  return (
    <div className="App">
      <h1>Send us your responses!</h1>
      <div className="screenshots">
        {videoNames.map((name) => {
          return (
            <Screenshot
              key={name.id}
              id={name.id}
              videoQuestion={name.question}
              handleQuestion={handleQuestionSelected}
            />
          );
        })}
      </div>
      {isAVideoUp.is && (
        <Video
          videoQuestion={videoNames[isAVideoUp.id].question}
          videos={stateOfVideos}
          videoUp = {isAVideoUp}
          setIsAVideoUp = {setIsAVideoUp}
          setVideos={setStateOfVideos}></Video>
      )}
    </div>
  );
}

export default App;
