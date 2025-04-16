import React, {
  useEffect,
  useRef,
  useContext,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import path from "path";

// Icons
import { MdOutlineDownloading } from "react-icons/md";
import { GrUploadOption } from "react-icons/gr";

// Components & Context
import Modal from "./Modal.jsx";
import ReceiptContext from "../contexts/ReceiptProvider.jsx";

// Utils & Reducers
import { validateFile } from "../utils/validateFile.js";
import { initialState, receiptReducer } from "../reducers/receiptReducer.js";

const MainSection = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { receipt, setReceipt } = useContext(ReceiptContext);

  const initializeState = () => {
    const saved = localStorage.getItem("appState");
    return saved ? JSON.parse(saved) : initialState;
  };

  const [state, dispatch] = useReducer(
    receiptReducer,
    initialState,
    initializeState
  );

  // Helpers
  const setIsConfirmedAndStore = (value) => {
    dispatch({ type: "SET_IS_CONFIRMED", payload: value });
    localStorage.setItem("isConfirmed", JSON.stringify(value));
    if (value) dispatch({ type: "SET_MODAL_ON", payload: false });
  };

  const setMessageAndStore = (msg) => {
    localStorage.setItem("message", JSON.stringify(msg));
    dispatch({ type: "SET_MESSAGE", payload: msg });
  };

  const triggerFileInput = () => {
    setIsConfirmedAndStore(false);
    fileInputRef.current.click();
  };

  // Effects
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const color = state.error ? "text-[var(--red)]" : "text-[var(--green)]";
    if (state.message !== null) {
      dispatch({ type: "SET_MSG_COLOR", payload: color });
    }
  }, [state.error]);

  // File Handling
  const onFileChange = (e) => {
    const selected = e.target.files[0];
    const validated = validateFile(selected);

    if (!validated.valid) {
      dispatch({ type: "SET_ERROR", payload: true });
      setMessageAndStore(validated.message);
    } else {
      dispatch({ type: "SET_ERROR", payload: false });
      dispatch({
        type: "SET_MESSAGE",
        payload: `File selected: ${validated.fileName}`,
      });
      dispatch({ type: "SET_MSG_COLOR", payload: "text-[var(--green)]" });
      handleUpload(selected);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    dispatch({ type: "SET_ERROR", payload: false });
    setMessageAndStore("Uploading...");
    dispatch({ type: "SET_PROGRESS", payload: { started: true, pc: 0 } });

    try {
      const response = await axios.post(`${apiUrl}/uploads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded * 100) / e.total);
            dispatch({ type: "SET_PROGRESS", payload: { pc: percent } });
          }
        },
      });

      setReceipt(response.data.data);
      dispatch({ type: "SET_MODAL_ON", payload: true });
      dispatch({ type: "SET_ERROR", payload: false });
      setMessageAndStore("Upload Successful");
    } catch (err) {
      console.error("Upload error:", err);
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_PROGRESS", payload: { started: false, pc: 0 } });
      setMessageAndStore("Error uploading file. Please try again.");
    }
  };

  // Render
  if (state.modalOn) {
    return (
      <Modal
        receipt={receipt}
        dispatch={dispatch}
        setIsConfirmedAndStore={setIsConfirmedAndStore}
      />
    );
  }

  const ProgressBar = () =>
    state.progress.started && state.message.includes("Uploading...") && (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-[var(--green)] h-2.5 rounded-full"
          style={{ width: `${state.progress.pc}%` }}
        ></div>
      </div>
    );

  return (
    <main className="pt-[calc(10%+9rem)] min-h-[100vh] gap-[10vh] flex flex-col justify-between">
      <section className="hero flex flex-col items-center justify-between">
        {state.message === "Upload Successful" ? (
          <div className="shadow-[0px_10px_25px_5px_rgba(239,_18,_243,_0.2)] gap-3 flex flex-col items-center justify-center p-6 bg-[var(--main-background-color)] rounded-3xl mb-6">
            <div
              className="flex items-center cursor-pointer hover:scale-[1.01] transition-all duration-200 hover:opacity-90"
              onClick={() => {
                state.isConfirmed
                  ? navigate("/items")
                  : dispatch({ type: "SET_MODAL_ON", payload: true });
              }}
            >
              <span className="text-[2.8rem] font-bold mr-4">Resume Split</span>
              <MdOutlineDownloading
                style={{ transform: "scaleY(-1)" }}
                className="text-[2.8rem]"
              />
            </div>
            <span
              className="text-green-500 font-semibold hover:cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              onClick={triggerFileInput}
            >
              Submit another bill? <u className="font-normal ml-1">click here</u>
            </span>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
            <ProgressBar />
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
            {!state.message && (
              <span className={state.msgColor}>.json files required *</span>
            )}
            {state.message && (
              <span className={state.msgColor}>{state.message}</span>
            )}
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
            <ProgressBar />
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
  );
};

export default MainSection;
