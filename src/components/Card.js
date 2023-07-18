import './Card.css';
import PropTypes from 'prop-types';

const Card = props => {
  const toggleDelete = () => {
    props.deleteCard(props.cardId);
  };

  const toggleLike = () => {
    props.updateLikes({ ...props, likesCount: props.likesCount + 1 });
  };

  return (
    <section className='Card'>
      <p>{props.message}</p>
      <section className='card-active-bar'>
        <p>
          {props.likesCount} <span onclick={toggleLike}> 💕 </span>
        </p>
        <p onClick={toggleDelete} className='delete'>
          Delete
        </p>
      </section>
    </section>
  );
};

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number,
  boardId: PropTypes.number.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default Card;
