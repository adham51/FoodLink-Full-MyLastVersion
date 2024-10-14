import React from 'react';
import FoodItem from './FoodItem';
const FoodList = ({ foodList }) => {
    return (
        <div className="row">
            {foodList.map((food, index) => (
                <FoodItem key={food.id || index} food={food} index={index} />
            ))}
        </div>
    );
};

export default FoodList;
