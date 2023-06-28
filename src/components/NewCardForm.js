import React, { useState } from 'react';
import './NewCardForm.css';
import PropTypes from 'prop-types';


const INITIAL_FORM_DATA = {
    message: ""
};

function NewCardForm(props) {

    const [cardFormData, setCardFormData] = useState(INITIAL_FORM_DATA);

    const anInputChanged = (evt) => {
        if (evt.target.value)
    }

    
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.createNewCard(cardFormData);
        setCardFormData(INITIAL_FORM_DATA);

    }





    return (
        <section className='CardList'>
            <h2>Create New Card</h2>
            <form className='stack' onSubmit={ handleFormSubmit } >
                <label htmlFor="cardMessage">Message:</label>
                <input
                id="cardMessage"
                name="message"
                type="text"
                value={ cardFormData.message }
                // onChange={ }
                />
            </form>
        </section>
    )
}

NewCardForm.propTypes = {
    createNewCard: propTypes.func.isRequired
}

export default NewCardForm;