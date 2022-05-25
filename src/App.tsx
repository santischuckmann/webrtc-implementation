import React, { useState } from 'react';

import Screenshot from './Screenshot';
import Video from './Video';
import { videoNames } from './videoNames';

interface StateOfVideos {
  video0: {
    up?: boolean;
    completed?: boolean;
    time?: number;
  };
  video1: {
    up?: boolean;
    completed?: boolean;
    time?: number;
  };
  video2: {
    up?: boolean;
    completed?: boolean;
    time?: number;
  };
  video3: {
    up?: boolean;
    completed?: boolean;
    time?: number;
  };
}

function App() {
  const [stateOfVideos, setStateOfVideos] = useState<StateOfVideos>({
    video0: {
      up: false,
      completed: false,
      time: 0,
    },
    video1: {
      up: false,
      completed: false,
      time: 0,
    },
    video2: {
      up: false,
      completed: false,
      time: 0,
    },
    video3: {
      up: false,
      completed: false,
      time: 0,
    },
  });
  const [isAVideoUp, setIsAVideoUp] = useState({
    is: false,
    id: 0,
  });

  const handleQuestionSelected = (id: number) => {
    setStateOfVideos({
      ...stateOfVideos,
      [`video${id}`]: {
        up: true,
      },
    });
    setIsAVideoUp({ is: true, id: id });
  };

  const getNextQuestion = () => {
    if (isAVideoUp.id == 3) {
      setIsAVideoUp({ is: true, id: 0 });
      return;
    }
    setIsAVideoUp({ is: true, id: isAVideoUp.id + 1 });
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
         getNextQuestion={getNextQuestion}
          videos = {stateOfVideos}
          setVideos = {setStateOfVideos}
          >
          </Video>
      )}
    </div>
  );
}

export default App;
