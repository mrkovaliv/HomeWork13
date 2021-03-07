import './App.module.css';
import Todos from './Todos/Todos';
import Retrospective from './Retrospective/Retrospective';
import Wheather from './Wheather/Wheather'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      
      <Link className="link" to='/wheater'>Wheater</Link>
      <Link className="link" to='/retro'>Retrospective</Link>
      <Link className="link" to='/todos'>Todos</Link>
      <Switch>
        <Route path='/wheater'>
        <Wheather />

        
        </Route>
        <Route path='/retro'>
        <Retrospective />
          
        </Route>
        <Route path='/todos'>
        <Todos />
          
        </Route>


      </Switch>
      
      
      </BrowserRouter>
      
      
      

    </div>
  );
}

export default App;
