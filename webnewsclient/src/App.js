import './App.css';
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Page from './components/page/Page';

const App = () => {  
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Page}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/register" component={RegisterForm}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
