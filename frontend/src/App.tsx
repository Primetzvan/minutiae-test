import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider } from 'react-query';
import Nav from './components/Navigation';
import { Users } from './pages/Users';
import Doors from './pages/Doors';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Management from './pages/Management';
import DeleteUser from './components/DeleteUser';
import FingerPrintScan from './components/FingerprintScan';
import NewUserForm from './components/NewUserForm';
import Loading from './components/Loading';
import SearchBar from 'material-ui-search-bar';
import AdminProfile from './components/AdminProfile';
import UserDetailProfile from './components/UserDetailProfile';
import Login from './pages/Login';
import CreateNewUser from './components/CreateNewUser';
import Logs from './components/Logs';



function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <Nav />

         <Router>
              <Route path="/" exact><Login /></Route>
              <Route path="/management" exact><Management /></Route>
              <Route path="/doors" exact><Doors/></Route>
              <Route path="/users" component={Users} />
              <Route path="/delete-user"><DeleteUser uuid="" arr={[]} removeIndex={() => {}}/></Route>
              <Route path="/fingerprintscan/:uuid"><FingerPrintScan /></Route>
              <Route path="/userdetail/:uuid"><UserDetailProfile /></Route>
              <Route path="/userform"><NewUserForm /></Route>
              <Route path="/loading"><Loading /></Route>
              <Route path="/search"><SearchBar /></Route>
              <Route path="/profile"><AdminProfile /></Route>
              <Route path="/new-user/:username"><CreateNewUser /></Route>
              <Route path="/logs"><Logs /></Route>
         </Router>
      </div>
    </QueryClientProvider>

  );
}

export default App;
