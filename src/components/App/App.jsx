import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

// MUI IMPORTS
import { ThemeProvider } from '@mui/material/styles';

//DESKTOP COMPONENTS
import Nav from '../Desktop/DesktopNav/Nav';
import AboutPage from '../AboutPage/AboutPage';
import SplashPage from '../Desktop/SplashPage/SplashPage';
import LoginPage from '../AllPages/Login/Login/LoginPage';
import RegisterPage from '../AllPages/Login/Register/RegisterPage';
import ResetPassPage from '../AllPages/Login/ResetPass/ResetPassPage';
import Invoicing from '../Desktop/Invoicing/Invoicing';
import EmployeeList from '../Desktop/Employee/EmployeeList/EmployeeList';
import ClientList from '../Desktop/Client/ClientList/ClientList';
import EmployeeSchedule from '../Desktop/Employee/EmployeeSchedule/EmployeeSchedule';
import AdminSettings from '../Desktop/AdminSettings/AdminSettings';

//MOBILE COMPONENTS
import Home from '../Mobile/Home/Home';
import Map from '../Mobile/MapView/MapView';
import WalkerSchedule from '../Mobile/WalkerSchedule/WalkerSchedule';
import RouteSelect from '../Mobile/RouteSelect/RouteSelect';
import Routes from '../Mobile/Route/Route';
import LoadBalancing from '../Mobile/LoadBalancing/LoadBalancing';
import MobileNav from '../Mobile/MobileNav/MobileNav';
import DogDetails from '../Mobile/DogDetails/DogDetails';
//MISC COMPONENTS
import ImageUpload from '../AllPages/ImageUpload/ImageUpload';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { theme } from '../AllPages/Theme/Theme';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app_body">

          <Nav />
          <Switch>

            {/* --------------------- REDIRECTIONS -------------------- */}

            <Redirect exact from="/" to="/home" />

            {/* needs to be fixed for conditional rendering - screen sizes? */}
            <Route exact path="/home">
              {user.id ?  // "/user" --> splash page
                <Redirect to="/user" />
                :
                <LoginPage />}
            </Route>

            {/* needs to be fixed for conditional rendering - screen sizes? */}
            <Route exact path="/login">
              {user.id ? // "/user" --> splash page
                <Redirect to="/user" />
                :
                <LoginPage />}
            </Route>

            {/* just for building the app, should be worked into add employee */}
            <Route exact path="/registration">
              {user.id ? // "/user" --> splash page
                <Redirect to="/user" />
                :
                <RegisterPage />}
            </Route>

            {/* ----------------------- DESKTOP ----------------------- */}

            {/* only needed for presentation */}
            <Route exact path="/about">
              <AboutPage />
            </Route>

            <ProtectedRoute exact path="/user">
              {user.admin ? <SplashPage /> : <Redirect to="/m/user" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/invoice">
              {user.admin ? <Invoicing /> : <Redirect to="/home" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/employees">
              {user.admin ? <EmployeeList /> : <Redirect to="/home" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/schedule">
              {user.admin ? <EmployeeSchedule /> : <Redirect to="/home" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/clients">
              {user.admin ? <ClientList /> : <Redirect to="/home" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/admin">
              {user.admin ? <AdminSettings /> : <Redirect to="/home" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/resetpass">
              {user.admin ? <ResetPassPage /> : <Redirect to="/home" />}
            </ProtectedRoute>

            {/* ----------------------- MOBILE ----------------------- */}

            <ProtectedRoute exact path="/m/user">
              <Home />
            </ProtectedRoute>

            <ProtectedRoute exact path="/m/map">
              <Map />
            </ProtectedRoute>

            <ProtectedRoute exact path="/m/schedule">
              <WalkerSchedule />
            </ProtectedRoute>

            <ProtectedRoute exact path="/m/routes">
              <RouteSelect />
            </ProtectedRoute>

            <ProtectedRoute exact path="/m/route/:id">
              <Routes />
            </ProtectedRoute>

            <ProtectedRoute exact path="/m/dog/:id"> {/* should we use params here? - sarah */}
              <DogDetails />
            </ProtectedRoute>

            <ProtectedRoute exact path="/m/routes/admin">
              <LoadBalancing />
            </ProtectedRoute>

            <ProtectedRoute exact path="/m/resetpass">
              <ResetPassPage />
            </ProtectedRoute>


            {/* ----------------------------------------------------- */}

            {/* No matching routes: return 404. */}
            <Route>
              <h1>404</h1>
            </Route>

          </Switch>

          <MobileNav />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
