
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './Router';
import { Provider } from 'react-redux';
import React from 'react'
import { store } from './redux/store';

function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
  );
}

export default App; 
