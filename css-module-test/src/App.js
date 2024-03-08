import React from 'react';
import Style from './App.module.scss';
import {styled} from 'styled-components';

const StyleButton = styled.button`
  color: red;
`

function App() {
  return (
    <div className="App">
      <div className={Style.text}>hello css module</div>
      <StyleButton>按钮</StyleButton>
    </div>
  );
}

export default App;
