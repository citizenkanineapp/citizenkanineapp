import React from 'react';
import ImageUpload from '../../../components/AllPages/ImageUpload/ImageUpload';
import LogOutButton from '../../../components/AllPages/LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function SplashPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <ImageUpload />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default SplashPage;
