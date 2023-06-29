import './Card.css';
import PropTypes from 'prop-types';

const Card = props => {
  return (
    <section className='Card'>
      <p>
        message: {props.message}
        likesCount: {props.likesCount}
      </p>
    </section>
  );
};

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number,
  boardId: PropTypes.number.isRequired,
};

export default Card;
