import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './page/Home';
import FileSystem from './page/FileSystem';
import Console from "./page/console/Console";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/fileSystem">
              <FileSystem />
            </Route>
            <Route path="/console">
              <Console />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
