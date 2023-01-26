import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";



function AboutPage() {
  const dispatch = useDispatch();

  //curently re-directing to quickbooks log in but not working
  const connectQB = ()=>{
   location.href = "http://localhost:5000/api/oauth2/connect_handler";
  }

  const updateServices = ()=>{
    dispatch({type: 'GET_QB_SERVICES'})
  }

  const quickbooksSync = ()=>{
    dispatch({ type: 'QUICKBOOKS_SYNC'})

  }

  return (
    <div className="container">
      <h1>AboutPage</h1>
      <button onClick={connectQB}>Connect to QB</button> 
      <button onClick={connectQB}>
        <img src="public/Images/qbButton.png" alt="quickbooks logo"/>
      </button>
      <button onClick={updateServices}>Sync Services</button>
      <button onClick={quickbooksSync}>Sync With Quickbooks</button>
    </div>
  );
}

export default AboutPage;
