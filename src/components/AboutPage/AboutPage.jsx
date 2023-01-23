import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function AboutPage() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_CLIENTS'})
  // }, []);

  const authURL = useSelector(store => store.oAuth2Reducer)
  
  //curently re-directing to quickbooks log in but not working
  const connectQB = ()=>{
   location.href = "http://localhost:5000/api/oauth2/connect_handler";
  }

  const quickbooksSync = ()=>{
    dispatch({ type: 'QUICKBOOKS_SYNC'})
  }



  return (
    <div className="container">
      <h1>AboutPage</h1>
      <button onClick={connectQB}>Connect to QB</button>
      {/* <button onClick={originalSync}>Original Sync Test</button> */}
      {/* <button onClick={updateAllCustomers}>Pull New Customers</button> */}
      <button onClick={quickbooksSync}>Sync With Quickbooks</button>
    </div>
  );
}

export default AboutPage;
