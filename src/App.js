
import './App.css';
import AuthForm from './component/Auth/AuthForm'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';

import ContextProvider from './component/store/ContextProvider';
import ContextStore from './component/store/ContextStore';
import Home from './component/Home/Home';
import { useContext } from 'react';
function App() {
  const context = useContext(ContextStore)
  console.log(context.token)
  return (
    <>
   
<ContextProvider>

    <Router>
      <Routes>
      <Route exact path = "/" Component = {AuthForm} />
     { context.token != null && <Route exact path = "/home" Component = {Home} /> }
     <Route exact path = "*" Component = {AuthForm} />
     </Routes>
    </Router>
  </ContextProvider>
  </>
  );
}

export default App;
