import React, { useState, useEffect, useContext, useRef } from 'react';
import Items from './Items.jsx';
import ReceiptContext from '../contexts/ReceiptProvider.jsx';

function ItemsList() {

    const { receipt, setReceipt } = useContext(ReceiptContext);

    const recieptSave = receipt; 
    console.log('receipt : ', receipt);
    console.log(recieptSave);


    return (
        <>
            <div className="flex flex-col pt-[calc(10%+7rem)] py-[2rem] gap-6">
                <div className="font-bold text-3xl">ITEMS LIST</div>

                {receipt && receipt.items && receipt.items.length > 0 ? (
                    <div>
                        <Items receipt={receipt} />
                        <div className="flex justify-center items-center">
                            <div className="ty relative text-3xl w-[40%] rounded-md ripple mb-[40%] bg-purple-700 mt-[5%] py-2 px-4">
                                Generate Bill
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div> // You can show a loading state until receipt.items is available
                )}
            </div>
        </>
    );
}

export default ItemsList;
