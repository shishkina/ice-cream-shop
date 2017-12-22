import React from 'react';



const Dashboard = (props) => {
  console.log(props, 'props from dash');
  return (
    <div className="dash">
      <h1> Welcome, {props.user.username}! </h1>
    </div>
  )
}

export default Dashboard;
