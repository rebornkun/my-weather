import Aside from '../Components/Aside/Aside';
import daycss from '../skins/day.css';
import clearcss from '../skins/clear.css';
import icons from '../font-awesome-4.7.0/css/font-awesome.min.css'
import Dashboard from '../Pages/Dashboard/Dashboard';
import './App.css';
import SignIn from '../Pages/SignIn/SignIn';


function App() {
  return (
    <div className="App">
      <SignIn />
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
