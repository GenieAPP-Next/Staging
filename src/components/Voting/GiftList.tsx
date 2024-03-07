import React from "react";
import GiftItem from "../Voting/GiftItem";
import { List } from "@mui/material";

const giftsData = [
  {
    id: 1,
    name: "Nike Air Max 1",
    price: "Rp1.900.000",
    votes: 0,
    checked: false,
    imageUrl: "path/to/nike-air-max-image.jpg",
  },
  {
    id: 2,
    name: "Daniel Wellington Watch",
    price: "Rp2.345.000",
    votes: 1,
    checked: true,
    imageUrl: "path/to/daniel-wellington-watch-image.jpg",
  },
  {
    id: 3,
    name: "Calvin Klein Handbag",
    price: "Rp4.500.000",
    votes: 0,
    checked: false,
    imageUrl: "path/to/calvin-klein-handbag-image.jpg",
  },
  {
    id: 4,
    name: "Hush Puppies Flats",
    price: "Rp1.999.000",
    votes: 0,
    checked: false,
    imageUrl: "path/to/hush-puppies-flats-image.jpg",
  },
];

const GiftList: React.FC = () => {
  return (
    <main>
      <List>
        {giftsData.map((gift, index) => (
          <GiftItem
            key={index}
            name={gift.name}
            price={gift.price}
            votes={gift.votes}
            checked={gift.checked}
            imageUrl={gift.imageUrl}
          />
        ))}
      </List>
    </main>
  );
};

export default GiftList;
