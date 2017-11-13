import React from 'react';

import { Link } from 'react-router-dom';

const IceCream = (props) => {
  return (
    <div className="ic-inlist">
      <img src={props.icecream.url} />
      <h2>{props.icecream.flavor}</h2>
      <p>Rating: {props.icecream.rating}</p>
      <Link to={`/ice-cream/${props.icecream.id}`}>See More</Link>
    </div>
  )
}

export default IceCream;
