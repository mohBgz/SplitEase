import React, { useState, useRef, useEffect} from 'react';
import Item from './Item';

function Items({ receipt }) {

  if (!receipt || !receipt.items || receipt.items.length === 0) {
    return <div>No items available</div>; // Handle empty or missing items
}

  const items = receipt["items"];

  const divRef =useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setOpenIndex(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  const [openIndex, setOpenIndex] = useState(null); // The index of which Item should be open (isOpenProduct === true in the child "Item")

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3"
    ref={divRef} 
    
    >
      {items.length === 0 ? (
        <p>Loading...</p>
      ) : (
        items.map((item, index) => (
          // isOpenProduct passed to each <Item/>: A boolean value that determines whether the item should be open or not (based on whether the openIndex matches the index of the item).
          <Item
            key={index}
            productName={item.name}
            indexProduct={index}
            onToggleProduct={handleToggle}
            isOpenProduct={openIndex === index}
            
          />
        ))
      )}
    </div>
  );
}

export default Items;
