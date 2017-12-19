import React from 'react';

import { Link } from 'react-router-dom';

const IceCreamSingle = (props) => {
  return (
    <div className="icecream-single">
      <div className="inner">
        <div className="img">
          <img src={props.icecream.url} alt={props.icecream.flavor} />
        </div>
        <div className="info">
          <h4 className="brand">{props.icecream.brand}</h4>
          <h1>{props.icecream.flavor}</h1>
          <p>{props.icecream.description}</p>
          <div className="links">
            <span className="rating">Rating: {props.icecream.rating}</span>
            <Link to={`/ice-cream/edit/${props.icecream.id}`}>Edit</Link>
            <span className="delete" onClick={() => props.iceCreamDelete(props.icecream.id)}>Delete</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IceCreamSingle;
