import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { Buffer } from 'buffer';

// Расширяем глобальный интерфейс Window, чтобы объявить свойство Buffer
// Это позволяет TypeScript понимать, что Buffer теперь доступен как глобальная переменная в браузере
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Присваиваем Buffer глобальному объекту window, чтобы сделать его доступным глобально
// Это необходимо, так как некоторые библиотеки или части кода могут ожидать, что Buffer будет глобально доступен, как в среде Node.js
window.Buffer = Buffer;

// Рендер приложения
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);