'use client';

import React, { useEffect, useState } from "react";
import { getAllItems } from "../actions";
import ItemCard from "../components/Inventory/ItemCard";
import ItemsTable from "../components/Inventory/ItemsTable";

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

export default function Home( { initialItems = [] }: { initialItems: Item[]}) {

  // const [isLoading, setIsLoading] = useState();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [tableView, setTableView] = useState(false);

  useEffect(() => {
    const fetchItemData = async () => {
      const itemData = await getAllItems();
      setItems(itemData);
    }
    fetchItemData();
  }, []);


  return (
    <>
      <p className="text-center my-2 mt-8 text-6xl font-exo" data-testid="title">SUPRA<span className="text-[#2FA8FA]">VAULT</span></p>
      <p className="text-center my-2 text-2xl font-exo underline">Full Inventory</p>
      <div className="flex-between w-10/12 justify-self-center">
        {items.length == 0 ? <p className='text-center text-[#F02D3A]'>No Items Found</p> : <p className='text-center text-green-500'>{items.length} Items Found</p>}
        <div className='flex gap-1'>
          <button className=' p-2 rounded-lg hover:text-[#2FA8FA]' onClick={() => setTableView(false)} data-testid="card-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </button>
          <button className=' p-2 rounded-lg hover:text-[#2FA8FA]' onClick={() => setTableView(true)} data-testid="table-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
      {
        tableView ? 
        <div data-testid="items-table" className='w-10/12 px-6 py-2 mb-10 justify-self-center shadow-md shadow-black rounded-xl'>
          <ItemsTable items={items} />
        </div>
        
        :
      
        <ul className="card_grid pb-10" data-testid="items-list">
          {
            items.map((item) => 
              <ItemCard key={item.id} item={item} data-testid="item-card" />
            )
          }
        </ul>
      }
    </>
  );
}
