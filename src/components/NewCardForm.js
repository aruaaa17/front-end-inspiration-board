import React, { useState } from 'react';
import './NewCardForm.css';
import PropTypes from 'prop-types';

function NewCardForm(props) {
  const [cardFormData, setCardFormData] = useState({
    message: '',
    likesCount: 0,
  });

  const handleFormSubmit = event => {
    event.preventDefault();
    props.createNewCard(cardFormData);
    setCardFormData({
      message: '',
      likesCount: 0,
    });
  };

  const updateCardForm = event => {
    setCardFormData({
      ...cardFormData,
      [event.target.name]: event.target.value,
    });
  };

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
