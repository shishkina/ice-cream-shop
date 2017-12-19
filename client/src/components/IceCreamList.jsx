import React from 'react';

import IceCream from './IceCream';

const IceCreamList = (props) => {
  return (
    <div className="icecream-list">
      {props.allIceCreams.map(icecream => {
        return <IceCream key={icecream.id} icecream={icecream} />
      })}
    </div>
  );
};

export default IceCreamList;
