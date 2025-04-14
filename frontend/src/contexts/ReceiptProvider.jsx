import React, { createContext, useState, useEffect } from "react";

// Create the ReceiptContext
const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {
  // Initialize state with data from localStorage if available
  const [receipt, setReceipt] = useState(() => {
    const savedReceipt = localStorage.getItem("receipt");
    return savedReceipt ? JSON.parse(savedReceipt) : null;
  });

  useEffect(() => {
    // Save the receipt data to localStorage whenever it changes
    if (receipt) {
      localStorage.setItem("receipt", JSON.stringify(receipt));
    }
  }, [receipt]);

  return (
    <ReceiptContext.Provider value={{ receipt, setReceipt }}>
      {children}
    </ReceiptContext.Provider>
  );
}

export default ReceiptContext;