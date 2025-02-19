import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const NewBoardForm = props => {
  const [boardFormData, setBoardFormData] = useState({
    title: '',
    owner: '',
  });
  const [showComponent, setShowComponent] = useState(true);
  const [error, setErrorMessage] = useState('');

  const updateBoardForm = event => {
    setBoardFormData({
      ...boardFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (!boardFormData.title || !boardFormData.owner) {
      const missingData = !boardFormData.title
        ? boardFormData.title
        : boardFormData.owner;
      setErrorMessage(`Whoops! Invalid data: missing ${missingData} input`);
      setShowComponent(!showComponent);
    } else {
      props.createNewBoard(boardFormData);
    }
    setBoardFormData({
      title: '',
      owner: '',
    });
  };

  if (error && !showComponent) {
    return (
      <section className='new-board-form error'>
        <h2>Create a New Board</h2>
        <p>{error}</p>
        <button
          className='new-board-form_hide show'
          onClick={() => setShowComponent(!showComponent)}
        >
          Show New Board Form
        </button>
      </section>
    );
  }

  if (!showComponent) {
    return (
      <section className='new-board-form hidden'>
        <h2>Create a New Board</h2>
        <button
          className='new-board-form_hide show'
          onClick={() => setShowComponent(!showComponent)}
        >
          Show New Board Form
        </button>
      </section>
    );
  }

  return (
    <section className='new-board-form'>
      <h2>Create a New Board</h2>
      <form onSubmit={handleFormSubmit} className='stack'>
        <section className='input-form'>
          <section className='form-title'>
            <label htmlFor='title'>Board Title:</label>
            <input
              name='title'
              type='text'
              value={boardFormData.title}
              onChange={updateBoardForm}
            />
          </section>
          <section className='title-owner'>
            <label htmlFor='owner'>Owner&apos;s Name:</label>
            <input
              name='owner'
              type='text'
              value={boardFormData.owner}
              onChange={updateBoardForm}
            />
          </section>
        </section>
        <section className='submit-board'>
          <input type='submit' value='Add New Board' />
        </section>
      </form>
      <button
        className='new-board-form_hide'
        onClick={() => setShowComponent(!showComponent)}
      >
        Hide New Board Form
      </button>
    </section>
  );
};

NewBoardForm.propTypes = {
  createNewBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
