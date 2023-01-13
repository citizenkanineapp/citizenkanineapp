import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function AboutPage() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'AUTHORIZATION_REQUEST'})
  // }, []);

  const authURL = useSelector(store => store.oAuth2Reducer)
  
  //curently re-directing to quickbooks log in but not working
  const connectQB = ()=>{
   location.href = "http://localhost:5000/api/quickbooks/connect_handler";
  }

  const apiCall = ()=>{
    dispatch({ type: 'GET_QB_CUSTOMERS'})
  }


  return (
    <div className="container">
      <h1>AboutPage</h1>
      <button onClick={connectQB}>Connect to QB</button>
      <button onClick={apiCall}>API call</button>
    </div>
  );
}

export default AboutPage;
