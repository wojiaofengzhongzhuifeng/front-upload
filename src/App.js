import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './page/Home';
import FileSystem from './page/FileSystem';
import {ShareFileSystemComponent} from './component/fileSystem/fileSystem';
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
            <Route path="/share">
              <ShareFileSystemComponent />
            </Route>
            <Route path="/console">
              <Console pathName='/console'/>
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
