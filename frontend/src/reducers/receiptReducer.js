

const initialState = {
    modalOn: false,
    error: false,
    msgColor: 'text-gray-500',
    progress: { started: false, pc: 0 },
    message: JSON.parse(localStorage.getItem("message")) || null,
    isConfirmed: JSON.parse(localStorage.getItem("isConfirmed")) || false,
  };

  

const receiptReducer = (state, action) => {
    switch (action.type) {

        case 'RESET_STATE':
            return initialState; // Reset to initial state

        case 'SET_MODAL_ON':
            return { ...state, modalOn: action.payload };

        case 'SET_ERROR':
            return { ...state, error: action.payload };

        case 'SET_MSG_COLOR':
            return { ...state, msgColor: action.payload };

        case 'SET_PROGRESS':
            return { ...state, progress: { ...state.progress, ...action.payload } };
            // Perform a merge of the progress object with the new value

        case 'SET_MESSAGE':
            
            return { ...state, message: action.payload };

        case 'SET_IS_CONFIRMED':
          
            return { ...state, isConfirmed: action.payload };

        default:
            return state;
    }
};
  
  export { initialState, receiptReducer };
  