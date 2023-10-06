
import './App.css';
import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';
import { HomePage } from './components/HomePage/HomePage';

function App() {
  defineCustomElements();
  return (
    <div className="App">
      <HomePage></HomePage>
    </div>
  );
}

export default App;
