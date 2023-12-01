import './App.css';
import Home from './Pages/Home';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router';
import ShelterLocator from './Pages/ShelterLocator';
import VolunteerOpportunites from './Pages/VolunteerOpportunities';
import CaseManagement from './Pages/CaseManagement';
import Navbar from './Components/Random/Navbar'
import LegalAid from './Pages/LegalAid';
import HealthCareAccess from './Pages/HealthCareAccess';
import BlogPage from './Pages/BlogPage';
import { useState } from 'react';
import LoginOrganization from './Components/LoginOrganization/LoginOrganization'

function App() {


  const [state, changeState] = useState(false);

  return (
    <>



      {!state && 
      <div>
        <LoginOrganization changeState={changeState}></LoginOrganization>
        </div>}
      {state &&
        <>
      <Navbar></Navbar>

          <Switch>
            <Route path='/' exact  >
              <Redirect to={'/home'}></Redirect>
            </Route>
            <Route path='/home' exact  >
              <Home state={state}></Home>
            </Route>
            <Route path='/ShelterLocator' exact  >
              <ShelterLocator state={state}></ShelterLocator>
            </Route>
            <Route path='/VolunteerOpportunities' exact  >
              <VolunteerOpportunites state={state}></VolunteerOpportunites>
            </Route>
            <Route path='/HealthAccess' exact>
              <HealthCareAccess state={state}></HealthCareAccess>
            </Route>
            <Route path='/LegalOrganization'>
              <LegalAid state={state}></LegalAid>
            </Route>
            
            <Route path='/' >
              <Redirect to={'/home'}></Redirect>
            </Route>
          </Switch>
        </>}

    </>



  );
}

export default App;
