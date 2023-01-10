import { useSelector, useDispatch } from "react-redux";
function AboutPage() {
  const dispatch = useDispatch();

  const connectQB = ()=>{
    dispatch({ type: 'AUTHORIZATION_REQUEST'})
  }

  const apiCall = ()=>{

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
