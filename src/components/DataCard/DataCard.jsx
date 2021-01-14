import React from 'react';
import './DataCard.scss';
import UpdateIcon from '@material-ui/icons/Update';
import ErrorIcon from '@material-ui/icons/Error';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const iconData = {
  upcoming: <UpdateIcon className="icon icon-future"/>,
  fail: <ErrorIcon className="icon icon-fail"/>,
  succes: <ThumbUpIcon className="icon icon-success"/>
}

const DataCard = ({ type, name, date, shipType, mass, orbit }) => {
  return (
    <div className="data-card">
      {iconData[type]}
      <p className="name">{name}</p>
      <p className="date">{date}</p>
      <div className="card-info">
        <p className="ship-type"><span>Type: </span>{shipType ? shipType : '?'}</p>
        <p className="mass"><span>Mass: </span>{mass ? `${mass}kg` : '?'}</p>
        <p className="orbit"><span>Orbit: </span>{orbit ? orbit : '?'}</p>
      </div>
    </div>
  );
}

export default DataCard;
