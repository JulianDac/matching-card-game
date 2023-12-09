import React from 'react';
import './Card.css';

function Card ({image, isFlipped, onCardClicked}) {

    return (
        <div className="card" onClick={onCardClicked}>
            {isFlipped ? <img src={image} alt="card"/> : <div className="card-back"></div>}
        </div>
    );
}

export default Card;