import React from 'react';
import { Restaurant } from './restaurant';
import { restaurantsPageQuery_allRestaurants } from '../__api__/restaurantsPageQuery';
export const RestaurantList: React.FC<
  Pick<restaurantsPageQuery_allRestaurants, 'result'>
> = ({ result }) => {
  return (
    <div className="grid lg:grid-cols-2">
      {result &&
        result.map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id + ''}
            coverImage={restaurant.coverImage}
            name={restaurant.name}
            address={restaurant.address}
            categoryName={restaurant.category?.name}
          />
        ))}
    </div>
  );
};
