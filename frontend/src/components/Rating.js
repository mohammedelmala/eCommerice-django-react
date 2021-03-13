import React from 'react'
import PropTypes from 'prop-types';

const Rating = ({ value, numOfReviews, color }) => {

    const rating = [...Array(5)].map((v, i) => {
        return (
            <span key={i} style={{ color }}>
                <i className={value >= i + 1 ? "fas fa-star" : value > i ? "fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
        )

    });

    return (
        <div className="rating">
            {rating} ({numOfReviews})
        </div>
    );
}


Rating.defaultProps = {
    color: "#f8e825"
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    numOfReviews: PropTypes.number.isRequired,
    color: PropTypes.string
}
export default Rating;

