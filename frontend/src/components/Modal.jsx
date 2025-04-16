import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemsOnModal from './ItmesOnModal';


function Modal({ receipt,  dispatch, setIsConfirmedAndStore }) {
  const navigate = useNavigate();

  return (
    <div className="px-6 pt-[8%] flex flex-col justify-start items-center h-[100vh] bg-[rgba(0,0,0,0.7)] absolute right-0 left-0 bottom-0 top-0">
      <div className="h-[70%] w-auto">
        {/* Header */}
        <div className="flex flex-col justify-between p-5 text-xl font-medium w-[100%] bg-purple-700 rounded-t-xl">
          <div>Confirm your receipt?</div>
        </div>

        {/* Receipt Details */}
        <div className="bg-purple-900 h-[100%] p-5 overflow-y-scroll scrollbar rounded-b-xl">
          {receipt?.date && (
            <div className="mb-5 mt-4 text-xl text-green-500 font-semibold">
              {receipt.date.day} - - {receipt.date.time}
            </div>
          )}
          <ItemsOnModal receipt={receipt} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around py-4 items-center">
          <div
            onClick={() => {
              dispatch({ type: 'SET_MODAL_ON', payload: false });
            }}
            className="bg-[var(--red)] py-2 px-3 rounded-md hover:cursor-pointer hover:opacity-[80%] active:scale-95 transition-all duration-300"
          >
            Go Back
          </div>

          <div
            onClick={() => {
              setIsConfirmedAndStore(true);
              navigate('/items');
            }}
            className="bg-[var(--green)] py-2 px-3 rounded-md hover:cursor-pointer hover:opacity-[80%] active:scale-95 transition-all duration-300"
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
