import React, { useState } from 'react';

import Screenshot from './Screenshot';
import Video from './Video';
import { videoNames } from './videoNames';

interface videoUp {
  is: boolean
  id: number
}

function App() {
  const [isAVideoUp, setIsAVideoUp] = useState<videoUp>({
    is: false,
    id: 0,
  });

  const handleQuestionSelected = (id: number) => {
    setIsAVideoUp({ is: true, id: id });
  };
  
  return (
    <div className="App">
      <h1> - System for an online interview process - </h1>
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
      <div className = "videos_container">
      {isAVideoUp.is && (
        <Video
          videoQuestion={videoNames[isAVideoUp.id].question}
          videoUp = {isAVideoUp}
          setIsAVideoUp = {setIsAVideoUp}></Video>
      )}
      </div>
      <footer>
        <h4>Created and designed by Santiago Schuckmann</h4>
        <ul>
          <li><a href="https://github.com/santischuckmann">Github</a></li>
          <li><a href="https://www.linkedin.com/in/santiago-schuckmann-33183620a/">LinkedIn</a></li>
          <li><a href="">Email</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
