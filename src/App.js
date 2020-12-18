import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">The counter is currently&nbsp;
        <span data-test="count">{count < 0 ? 0: count}</span>
      </h1>
      { 
        count < 0 ? 
        <h2 data-test="error-message" style={{ color: 'red' }}>Counter cannot go below zero</h2> 
        :
        <br />
      }
      <button 
        data-test="increment-button"
        onClick={() => {
          if (count < 0) {
            setCount(1);
            return
          }
          setCount(count + 1);
        }}
      >
        Increment Counter
      </button>

      <button 
        data-test="decrement-button"
        onClick={() => {
          setCount(count - 1)
        }}
      >
        Decrement Counter
      </button>
    </div>
  );
}

export default App;
