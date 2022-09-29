import Aside from '../Components/Aside/Aside';
import Dashboard from '../Pages/Dashboard/Dashboard';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Aside />
      </header>
      <div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
