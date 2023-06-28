import React, { useState } from 'react';
import './NewBoardForm.css';
import PropTypes from 'prop-types';

const INITIAL_FORM_DATA = {
  title: '',
  owner: '',
};

const NewBoardForm = props => {
  const [boardFormData, setBoardFormData] = useState(INITIAL_FORM_DATA);

  const updateBoardForm = event => {
    setBoardFormData({
      ...boardFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    props.createNewBoard(boardFormData);
    setBoardFormData(INITIAL_FORM_DATA);
  };

  return (
    <section className='new-board-form'>
      <h2>NewBoardForm</h2>
      <form onSubmit={handleFormSubmit} className='stack'>
        <section className='form-title'>
          <label htmlFor='title'>Task Title:</label>
          <input
            onChange={updateTaskTitle}
            name='title'
            type='text'
            value={formFields.title}
          />
        </section>
        <section className='task-description'>
          <label htmlFor='description'>Task Description:</label>
          <input
            onChange={updateTaskDescription}
            name='description'
            type='text'
            value={formFields.description}
          />
        </section>
        <section className='submit-task'>
          <input type='submit' value='Add New Task' />
        </section>
      </form>
    </section>
  );
};

NewBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
