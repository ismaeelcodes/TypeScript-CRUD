import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { carModelsData } from '../Data';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, updateCard } from '../features/Cards';
import { RootState } from '../store';
import { ProtectRoute } from './ProtectRoute';

export default function CardCreator() {
  ProtectRoute() // Calling ProtectRoute
  const dispatch = useDispatch();
  // Initializing States
  const homeData = useSelector((state: RootState) => state.cards.value);
  const [model, setModel] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [regNo, setRegNo] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extracts the cardId using useLocation, splits the url by "/" and checks if the last string extracted is a potential Id.
  const cardId = location.pathname.split('/').pop() === 'CardCreator' ? undefined : location.pathname.split('/').pop(); 
  console.log(cardId)

  useEffect(() => {
    if (cardId) {
      // Finds the card with the specified ID
      const card = homeData.find((card) => card.id.toString() === cardId);
      if (card) {
        setMake(card.make);
        setModel(card.model);
        setRegNo(card.registrationNumber);
      }
    }
  }, [cardId, homeData]);

  function handleSubmit() {
    // Returns Error if any field is empty
    if (!make || !model || !regNo) {
      setError(true);
      return;
    }

    if (cardId) {
      // Updates existing card sending required object to the redux state.
      dispatch(
        updateCard({
          id: parseInt(cardId),
          make: make,
          model: model,
          registrationNumber: regNo,
          color: 'black',
        })
      );
    } else {
      // Adds new card, again, sending required object to the redux state.
      dispatch(
        addCard({
            // Finds Id by finding our states length, subtracting that by 1 to get the last card and then adding 1 to make place for the new one.
          id: homeData[homeData.length - 1].id + 1,
          make: make,
          model: model,
          registrationNumber: regNo,
          color: 'black',
        })
      );
    }
    navigate('/Home'); // Navigates back to the Home Page.
  }

  function handleMakeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedMake = event.target.value;
    setMake(selectedMake);
    setModel(carModelsData[selectedMake]?.[0] || '');
  } // sets the Make of the Car upon change and finds the first value of the model associated with that make.

  function handleModelChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setModel(event.target.value);
  } // sets model of the car

  function handleRegChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRegNo(event.target.value);
  } // sets Registration Number of the car.

  return (
    <div className="Container">
      <div className="loginDiv">
        {/* Displaying Text in Headings and Buttons Depending upon the use. */}
        <h2>{cardId ? 'Update Card' : 'Create your Card'}</h2>
        {error && (
          <span style={{ color: 'red', fontSize: '14px' }}>Please fill out the form correctly.</span>
        )}
        <div className="InpDiv">
          <label htmlFor="cars" className="labelCar">
            Select your Car
          </label>
          {/* Make Selector */}
          <select className="carMake" value={make} onChange={handleMakeChange}>
            <option value="">Choose a Car</option>
            {/* Mapping over the Keys of the Object taken from our data. */}
            {Object.keys(carModelsData).map((car) => (
              <option key={car} value={car}>
                {car}
              </option>
            ))}
          </select>
          {/* Model Selector */}
          <select className="carModel" value={model} onChange={handleModelChange}>
            {carModelsData[make]?.map((car) => (
              <option key={car} value={car}>
                {car}
              </option>
            ))}
          </select>

         {/* Registration Number Field */}
          <input
            className="Inp"
            placeholder="Registration Number"
            value={regNo}
            onChange={handleRegChange}
          />
        </div>

         {/* Create/Update Button */}
        <button className="loginBtn" onClick={handleSubmit}>
          {cardId ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
}
