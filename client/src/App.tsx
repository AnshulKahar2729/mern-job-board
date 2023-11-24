import React from "react";
import "./App.css";
import useFetchUserDetails from "./hooks/user";

const  App = () =>  {

  const {isLoading, user} = useFetchUserDetails();

  return (<div className="App">
    {isLoading}
    {user?.email}
    {user?.id}
    {user?.token}
    </div>);
}

export default App;
