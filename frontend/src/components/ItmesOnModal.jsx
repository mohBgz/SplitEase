import React, { useState } from 'react';
import ItemOnModal from './ItemOnModal';

function ItemsOnModal({ receipt }) {

  if (!receipt || !receipt.items || receipt.items.length === 0) {
    return <div>No items available</div>; // Handle empty or missing items
}

  const items = receipt["items"];



  const [openIndex, setOpenIndex] = useState(null); // The index of which Item should be open (isOpenProduct === true in the child "Item")

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.length === 0 ? (
        <p>Loading...</p>
      ) : (
        items.map((item, index) => (
          
          // isOpenProduct passed to each <Item/>: A boolean value that determines whether the item should be open or not (based on whether the openIndex matches the index of the item).
         
          
          <ItemOnModal
            key={index}
            productName={item.name}
          />
          
        ))
      )}
    </div>
  );
}

export default ItemsOnModal;
