import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

//DESKTOP COMPONENTS
import AboutPage from '../AboutPage/AboutPage';
import SplashPage from '../Desktop/SplashPage/SplashPage';
import LoginPage from '../AllPages/Login/LoginPage/LoginPage';
import RegisterPage from '../AllPages/Login/RegisterPage/RegisterPage';
import Invoicing from '../Desktop/Invoicing/Invoicing';
import EmployeeList from '../Desktop/Employee/EmployeeList/EmployeeList';
import ClientList from '../Desktop/Client/ClientList/ClientList';
//MOBILE COMPONENTS
import Home from '../Mobile/Home/Home';
import Map from '../Mobile/MapView/MapView';
import EmployeeSchedule from '../Mobile/EmployeeSchedule/EmployeeSchedule';
import Routes from '../Mobile/DailyRoutes/DailyRoutes';
import LoadBalancing from '../Mobile/LoadBalancing/LoadBalancing';
//MISC COMPONENTS
import ImageUpload from '../AllPages/ImageUpload/ImageUpload';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>

          {/* --------------------- REDIRECTIONS -------------------- */}

          <Redirect exact from="/" to="/home"/>

          {/* needs to be fixed for conditional rendering - screen sizes? */}
          <Route exact path="/home">
            {user.id ?  // "/user" --> splash page
              <Redirect to="/user"/>
              : 
              <LoginPage/>}
          </Route>

          {/* needs to be fixed for conditional rendering - screen sizes? */}
          <Route exact path="/login">
            {user.id ? // "/user" --> splash page
              <Redirect to="/user"/>
              :
              <LoginPage/>}
          </Route>

         {/* just for building the app, should be worked into add employee */}
          <Route exact path="/registration">
            {user.id ? // "/user" --> splash page
              <Redirect to="/user"/>
              :
              <RegisterPage/>}
          </Route>


        {/* ----------------------- DESKTOP ----------------------- */}

         {/* only needed for presentation */}
          <Route exact path="/about">
            <AboutPage/>
          </Route>

          <ProtectedRoute exact path="/user">
            <SplashPage/>
          </ProtectedRoute>

          <ProtectedRoute exact path="/invoice">
            <Invoicing/>
          </ProtectedRoute>

          <ProtectedRoute exact path="/employees">
            <EmployeeList/>
          </ProtectedRoute>

          <ProtectedRoute exact path="/schedule">
            <EmployeeSchedule/>
          </ProtectedRoute>

          <ProtectedRoute exact path="/clients">
            <ClientList/>
          </ProtectedRoute>

        {/* ----------------------- MOBILE ----------------------- */}

          <ProtectedRoute exact path="/m/user">
            <Home/>
          </ProtectedRoute>

          <ProtectedRoute exact path="/m/map">
            <Map/>
          </ProtectedRoute>

          <ProtectedRoute exact path="/m/employees">
            <EmployeeSchedule />
          </ProtectedRoute>

          <ProtectedRoute exact path="/m/routes">
            <Routes/>
          </ProtectedRoute>

          <ProtectedRoute exact path="/m/routes/admin">
            <LoadBalancing/>
          </ProtectedRoute>

        {/* ----------------------------------------------------- */}

           {/* No matching routes: return 404. */}
           <Route>
            <h1>404</h1>
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
