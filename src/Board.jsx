import React, {useState, useEffect} from 'react';
import Card from './Card';
import './Board.css';
import _ from 'lodash';

function Board() {
    const [cards, setCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isLocked, setIsLocked] = useState(false);
    const isGameCompleted = matchedCards.length === cards.length;

    useEffect(() => {
        const initCards = [];
        for (let i = 1; i <= 32; i++){
            initCards.push({id: `card-${i}-a`, image: `image${i}.png`});
            initCards.push({id: `card-${i}-b`, image: `image${i}.png`})
        }

        setCards(_.shuffle(initCards)); //also stores them in "cards" now
    }, []);

    const onCardClicked = (card) => {
        if (isLocked || selectedCards.includes(card)){
            return;
        }

        const newSelectedCards = [...selectedCards, card];
        setSelectedCards(newSelectedCards);

        if (newSelectedCards.length === 2) {
            setIsLocked(true); //lock the board

            // Check for a match
            if (newSelectedCards[0].image === newSelectedCards[1].image) {
                // It's a match
                setMatchedCards(prev => [...prev, newSelectedCards[0].id, newSelectedCards[1].id]);
                setSelectedCards([]);
                setIsLocked(false); // Unlock the board immediately when it's a match
            } else {
                // Not a match, flip them back over after a delay
                setTimeout(() => {
                    setSelectedCards([]);
                    setIsLocked(false); // Unlock the board immediately when it's a match
                }, 1000);
            }
        }
    };
      
    return (
        <div>
            <h1 className="title">Matching Card Game</h1>
            <div className="board">
                {cards.map((card) => (
                    <Card 
                        key={card.id} 
                        image={`/images/${card.image}`}
                        isFlipped={selectedCards.includes(card) || matchedCards.includes(card.id)}
                        onCardClicked={() => onCardClicked(card)} 
                    />
                ))}
            </div>
            {isGameCompleted && <h2 className="footer">Congratulations! You've beaten the game!</h2>}
        </div>
    );
}

export default Board;