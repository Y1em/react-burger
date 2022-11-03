import PropTypes from 'prop-types';

const itemPropTypes = PropTypes.shape({
  "_id": PropTypes.string.isRequired,
  "name": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "image_mobile": PropTypes.string.isRequired,
});

export { itemPropTypes };
