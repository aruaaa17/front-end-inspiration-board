import React, { useState } from 'react';
import './NewCardForm.css';
import PropTypes from 'prop-types';

function NewCardForm(props) {
  const [cardFormData, setCardFormData] = useState({
    message: '',
  });
  const [error, setErrorMessage] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();
    if (cardFormData.message.length > 40) {
      setErrorMessage(
        'Whoops! Input message is longer than expected. Message should not exceed 40 characters.'
      );
    } else {
      props.createNewCard(cardFormData);
    }
    setCardFormData({
      message: '',
    });
  };

  const updateCardForm = event => {
    setCardFormData({
      message: event.target.value,
    });
  };

  if (error) {
    return (
      <section className='CardList error'>
        <h2>Create a New Card</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className='CardList'>
      <h2>Create a New Card</h2>
      <form className='stack' onSubmit={handleFormSubmit}>
        <label htmlFor='cardMessage'>Message:</label>
        <input
          id='cardMessage'
          name='message'
          type='text'
          value={cardFormData.message}
          onChange={updateCardForm}
        />
        <section className='submit-card'>
          <input type='submit' value='Add New Card' />
        </section>
      </form>
    </section>
  );
}

NewCardForm.propTypes = {
  createNewCard: PropTypes.func.isRequired,
};

export default NewCardForm;
