import React from 'react';

interface IRestaurantProps {
  id: string;
  coverImage: string;
  name: string;
  categoryName?: string;
  address: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImage,
  name,
  categoryName,
  address,
}) => (
  <div className="my-4 grid h-32 grid-cols-3">
    <div
      className="mx-2 bg-cover bg-center"
      style={{ backgroundImage: `url(${coverImage})` }}
    ></div>
    <div className="col-span-2">
      <h3 className="text-lg font-bold">{name}</h3>
      <span className="text-sm text-gray-500">{categoryName}</span>
      <span className=" block text-sm text-gray-500">{address}</span>
    </div>
  </div>
);
