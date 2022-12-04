import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantsPageQuery_allCategories } from '../__api__/restaurantsPageQuery';

export const CategoryList: React.FC<
  Pick<restaurantsPageQuery_allCategories, 'categories'>
> = ({ categories }) => {
  return (
    <div className="ml-16 sm:m-0">
      {categories &&
        categories.map((category) => (
          <Link to={`/category/${category.slug}`}>
            <div
              key={category.id}
              className="m-4 inline-flex h-20 w-40 cursor-pointer rounded-lg bg-orange-100 p-2 text-lg shadow hover:bg-lime-100"
            >
              {category.name}
              <img
                className="w-20"
                src={category.coverImage ? category.coverImage : undefined}
              />
            </div>
          </Link>
        ))}
    </div>
  );
};
