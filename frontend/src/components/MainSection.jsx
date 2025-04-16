import React, { useEffect, useRef, useContext, useReducer } from "react";
import { MdOutlineDownloading } from "react-icons/md";
import Modal from "./Modal.jsx";
import axios from "axios";
import path from "path";
import { GrUploadOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { validateFile } from "../utils/validateFile.js"; // Import validateFile function
import { initialState, receiptReducer } from "../reducers/receiptReducer.js"; // Import initialState and receiptReducer
import  ReceiptContext  from "../contexts/ReceiptProvider.jsx"; // Import ReceiptContext

const MainSection = () => {

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const { receipt, setReceipt } = useContext(ReceiptContext); // Use ReceiptContext for receipt state


  const initializeState = () => {
    const savedState = localStorage.getItem("appState");
    return savedState ? JSON.parse(savedState) : initialState;
  };
  const [state, dispatch] = useReducer(receiptReducer, initialState, initializeState); // Initialize state with localStorage data

  const fileInputRef = useRef(null);

  // Function to set isConfirmed state and store it in local storage
  const setIsConfirmedAndStore = (value) => {
    dispatch({ type: "SET_IS_CONFIRMED", payload: value });
    localStorage.setItem("isConfirmed", JSON.stringify(value));
    if (value) dispatch({ type: "SET_MODAL_ON", payload: false });
  };

  // Function to set message state and store it in local storage
  const setMessageAndStore = (msg) => {
    localStorage.setItem("message", JSON.stringify(msg));
    dispatch({ type: "SET_MESSAGE", payload: msg });
  };




useEffect(() => {
  localStorage.setItem("appState", JSON.stringify(state));
}, [state]);


  // Update message color based on error state
  useEffect(() => {
    if (state.error) {
      dispatch({ type: "SET_MSG_COLOR", payload: "text-[var(--red)]" });
    } else if (state.message !== null) {
      dispatch({ type: "SET_MSG_COLOR", payload: "text-[var(--green)]" });
    }
  }, [state.error]);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const validatedFile = validateFile(selectedFile);
    if (!validatedFile.valid) {
      dispatch({ type: "SET_ERROR", payload: true });
      setMessageAndStore(validatedFile.message);
    } else {
      dispatch({ type: "SET_ERROR", payload: false });
      dispatch({ type: "SET_MSG_COLOR", payload: "text-[var(--green)]" });
      dispatch({ type: "SET_MESSAGE", payload: `File selected: ${validatedFile.fileName}` });
      dispatch({ type: "SET_MODAL_ON", payload: true });
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    dispatch({ type: "SET_ERROR", payload: false });
    setMessageAndStore("Uploading...");
    dispatch({ type: "SET_PROGRESS", payload: { started: true, pc: 0 } });

    try {
      const response = await axios.post(
       `${apiUrl}/uploads` , formData, {
        onUploadProgress: (progressEvent) => {
          console.log("G");
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch({ type: "SET_PROGRESS", payload: { pc: percentage } });
        },
      });

      console.log("Response", response.data);

      setReceipt(response.data); // Update receipt using context
      setMessageAndStore("Upload Successful");
     

      dispatch({ type: "SET_MODAL_ON", payload: true });
      dispatch({ type: "SET_ERROR", payload: false });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      console.error("Error", error);

      if (error.response) {
        if (error.response.data.includes("ENOENT")) {
          setMessageAndStore("Upload failed: Server directory or file not found");
        } else {
          setMessageAndStore(`Upload failed: ${error.response.data.message || "Server error"}`);
        }
      } else if (error.request) {
        setMessageAndStore("Upload failed: No response from server");
      } else {
        setMessageAndStore(`Upload failed: ${error.message}`);
      }
    }
  };

  const triggerFileInput = () => {
    setIsConfirmedAndStore(false); 
    fileInputRef.current.click();
  };

  return (
    <>
      {state.modalOn ? (
        <Modal
          receipt={receipt} // Use receipt from context
          dispatch={dispatch}
          setIsConfirmedAndStore={setIsConfirmedAndStore}
        />
      ) : (
        <main className="pt-[calc(10%+9rem)] min-h-[100vh] gap-[10vh] flex flex-col justify-between">
          <section className="hero flex flex-col items-center justify-between">
            {state.message === "Upload Successful" ? (
              <div className="shadow-[0px_10px_25px_5px_rgba(239,_18,_243,_0.2)] gap-3 flex flex-col items-center justify-center p-6 bg-[var(--main-background-color)] rounded-3xl mb-6">
                <div
                  className="flex items-center cursor-pointer hover:scale-[1.01] transition-all duration-200 hover:opacity-90"
                  onClick={() => {
                  
                      if(state.isConfirmed) {
                        navigate("/items");}else{
                          dispatch({ type: "SET_MODAL_ON", payload: true });
                        }
                  
                  
                  }}
                >
                  <span className="text-[2.8rem] font-bold mr-4">Resume Split </span>
                  <MdOutlineDownloading
                    style={{ transform: "scaleY(-1)" }}
                    className="text-[2.8rem]"
                  />
                </div>
                <span
                  className="text-green-500 font-semibold hover:cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  onClick={triggerFileInput}
                >
                  Submit another bill?
                  <u className="font-normal ml-1">click here</u>
                </span>
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  style={{ display: "none" }}
                />
                {state.progress.started && state.message.includes("Uploading...") && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-[var(--green)] h-2.5 rounded-full"
                      style={{ width: `${state.progress.pc}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={triggerFileInput}
                className="shadow-[0px_10px_25px_5px_rgba(239,_18,_243,_0.2)] cursor-pointer gap-3 flex flex-col items-center justify-center p-6 bg-[var(--main-background-color)] rounded-3xl mb-6 hover:scale-[1.03] transition-all duration-200"
              >
                <div className="flex items-center">
                  <span className="text-[2.8rem] font-bold mr-4">Upload Bill</span>
                  <GrUploadOption className="text-[2.8rem]" />
                </div>
                {!state.message && <span className={state.msgColor}>.json files required *</span>}
                {state.message && <span className={state.msgColor}>{state.message}</span>}
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  style={{ display: "none" }}
                />
                {state.progress.started && state.message.includes("Uploading...") && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-[var(--green)] h-2.5 rounded-full"
                      style={{ width: `${state.progress.pc}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-around gap-[5vw] mt-8">
              <div className="sec-bg px-7 py-2 flex flex-col justify-center items-center rounded-lg">
                <div className="text-[var(--secondary-text-color)]">You owe</div>
                <div className="text-[var(--red)]">PLN 25.32</div>
              </div>
              <div className="sec-bg px-7 py-2 flex flex-col justify-center items-center rounded-lg">
                <div className="text-[var(--secondary-text-color)]">You're owed</div>
                <div className="text-[var(--green)]">PLN 25.32</div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default MainSection;