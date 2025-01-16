'use client';

import React, { useEffect, useState } from "react";
import { getAllItems } from "../actions";
import ItemCard from "../components/Inventory/ItemCard";

interface Item {
  id: number;
  itemName: string;
  description: string;
  user: {
    id: number;
    username: string;
  }
  quantity: number;
}

export default function Home() {

  // const [isLoading, setIsLoading] = useState();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItemData = async () => {
      const itemData = await getAllItems();
      setItems(itemData);
    }
    fetchItemData();
  }, []);


  return (
    <>
      <p className="text-center my-2 mt-8 text-6xl font-exo py-5">SUPRAVAULT</p>
      <p className="text-center my-2 text-2xl font-exo">Full Inventory</p>
      <ul className="card_grid pb-10">
        {
          items.map((item) => 
            <ItemCard key={item.id} item={item} />
          )
        }
      </ul>
      
    </>
  );
}
