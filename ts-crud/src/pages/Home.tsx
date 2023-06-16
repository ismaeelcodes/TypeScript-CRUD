import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteCard } from '../features/Cards';
import { ProtectRoute } from './ProtectRoute';

export default function Home() {
  // Calling ProtectRoute as a High-Order Component.
  ProtectRoute();
  // Setting States
  const homeData = useSelector((state: RootState) => state.cards.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteCard = (cardId: number) => {
    dispatch(deleteCard(cardId));
  }; // Dispatches our deleteCard function with the cardId.

  const handleUpdateCard = (cardId: number) => {
    navigate(`/CardCreator/${cardId}`);
  }; // navigates to the card Creator with an Id, this Id helps to find the specific card being modified.

  const cardItems = homeData.map((card) => (
    <div className="CarDiv" key={card.id}>
      <h3 className="CarMake">{card.make}</h3>
      <span className="CarModel">{card.model}</span>
      <span className="CarReg">{card.registrationNumber}</span>
      <div className="btnDiv">
        <button onClick={() => handleDeleteCard(card.id)} className="deleteBtn">
          Delete
        </button>
        <button className="updateBtn" onClick={() => handleUpdateCard(card.id)}>
          Update
        </button>
      </div>
    </div>
  )); // mapping over our data

  return (
    <div className="HomeContainer">
        <Link to="/CardCreator">
        <button className="AddBtn">Add a Card</button>{' '}
      </Link>
      {cardItems}
    </div>
  );
}