import React, { useState } from 'react';
import './App.css';
import MindARThreeViewer from './mindar-three-viewer';
import FetchBackend from './components/FetchBackend.jsx'

function App() {
  const [started, setStarted] = useState(null);

  return (
    <div className="App">
      <h1>Example React component with <a href="https://github.com/hiukim/mind-ar-js" target="_blank">MindAR</a></h1>

      <div className="control-buttons">
        {started === null && <button onClick={() => {setStarted('three')}}>Start ThreeJS version</button>}
        {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
      </div>

      {started === 'three' && (
        <div className="container">
          <MindARThreeViewer />
        </div>
      )}
    <FetchBackend/>
    </div>
  );
}

export default App;