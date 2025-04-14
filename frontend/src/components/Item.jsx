import React, { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoPersonRemoveSharp, IoPersonAdd } from "react-icons/io5";
import users from '../../../backend/tests/data/users.json'; // Import the users data from the JSON file

function Item({ productName, indexProduct, onToggleProduct, isOpenProduct }) {

  // Track selectAll and selectedUsers for each item individually

  // Initialize selectAll state from localStorage for each item
  const [selectAll, setSelectAll] = useState(() => {
    const savedSelectAll = localStorage.getItem(`selectAll_${indexProduct}`);
    return savedSelectAll ? JSON.parse(savedSelectAll) : false;
  });

  // Initialize selectedUsers state from localStorage for each item
  const [selectedUsers, setSelectedUsers] = useState(() => {
    const savedSelectedUsers = localStorage.getItem(`selectedUsers_${indexProduct}`);
    return savedSelectedUsers ? JSON.parse(savedSelectedUsers) : new Array(users.length).fill(false);
  });

  // Initialize addedUsersCounter state from localStorage for each item
  const [addedUsersCounter, setAddedUsersCounter] = useState(() => {
    const savedCounter = localStorage.getItem(`addedUsersCounter_${indexProduct}`);
    return savedCounter ? JSON.parse(savedCounter) : 0;
  });

  // Save the addedUsersCounter state to localStorage for each item
  useEffect(() => {
    localStorage.setItem(`addedUsersCounter_${indexProduct}`, JSON.stringify(addedUsersCounter));
  }, [addedUsersCounter, indexProduct]);

  const inputRef = useRef();

  // Update the selection of individual users for this item
  const toggleSelection = (index) => {
    setSelectedUsers((prevState) => {
      const newSelectedUsers = [...prevState];
      newSelectedUsers[index] = !newSelectedUsers[index];

      const newCounter = newSelectedUsers.filter(item => item === true).length;
      setAddedUsersCounter(newCounter);

      const allSelected = newSelectedUsers.every(item => item === true);
      setSelectAll(allSelected);

      return newSelectedUsers;
    });
  };

  // Handle "Select All" for this item
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedUsers = new Array(users.length).fill(newSelectAll);
    setSelectedUsers(newSelectedUsers);

    const newCounter = newSelectAll ? users.length : 0;
    setAddedUsersCounter(newCounter);
  };

  // Save the selectAll state for each item into localStorage
  useEffect(() => {
    localStorage.setItem(`selectAll_${indexProduct}`, JSON.stringify(selectAll));
  }, [selectAll, indexProduct]);

  // Save selectedUsers state into localStorage for each item
  useEffect(() => {
    localStorage.setItem(`selectedUsers_${indexProduct}`, JSON.stringify(selectedUsers));
  }, [selectedUsers, indexProduct]);

  return (
    <div className="gradient-purple-white px-6 py-3 rounded-lg">
      <div
        className="p-2 w-[100%] h-fit hover:cursor-pointer rounded-md flex justify-between items-center"
        onClick={() => onToggleProduct(indexProduct)}
      >
        <div
          className={`text-xl font-semibold ${isOpenProduct || (addedUsersCounter>0) ? 'text-[var(--green)]' : 'text-gray-200'} transition-all duration-300`}
        >
          {productName}
        </div>
        {addedUsersCounter > 0 && (
          <div className="text-[var(--green)] text-lg">+{ addedUsersCounter === users.length ? 'All' : addedUsersCounter }</div>
        )}
        {isOpenProduct ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>

      {isOpenProduct && (
        <div className='text-xl flex justify-start items-center gap-4 rounded-md mt-4 p-2 bg-purple-900' 
          onClick={toggleSelectAll}>
          <div className='text-gray-400' style={{textShadow: '3px 2px 5px rgba(0, 0, 0, 0.4)'}} >
            Select All
          </div>
          <input 
            type="checkbox"
            checked={selectAll}
            ref={inputRef}
            onChange={toggleSelectAll}
            className='scale-[1.4]'
          />
        </div>
      )}

      <ul
        className={`scrollbar w-[100%] overflow-y-auto ${isOpenProduct ? 'h-[40vh] py-4 px-4' : 'h-0 p-0'} mt-2 text-xl`}
      >
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => toggleSelection(index)}
            style={{
              backgroundColor: selectedUsers[index] ? 'rgba(143, 7, 216, 0.64)' : '',
            }}
            className="item rounded-lg p-3 flex justify-between items-center hover:cursor-pointer"
          >
            <li className="text-[var(--third-text-color)]">{user.name}</li>
            {!selectedUsers[index] ? (
              <IoPersonAdd
                className="text-[1.4rem]"
                style={{ color: 'var(--green)' }}
              />
            ) : (
              <IoPersonRemoveSharp
                className="text-[1.4rem]"
                style={{ color: 'var(--red)' }}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Item;
