const maxFileSize = 1 * 1024 * 1024; // 1MB
const maxFileNameLength = 10;


export const validateFile = (selectedFile)=>{
    if (!selectedFile){
        return {valid : false, message: "No file selected"};
    } 
        
    if (selectedFile.type !== "application/json") {
       
        return {valid: false, message: "Invalid file type. Please upload a valid JSON file."};
    }
    
       
    if (selectedFile.size > maxFileSize) {
          
            return {valid: false, message: "File size exceeds the 1MB limit. Please upload a smaller file."};
        }
    
      
    let trimmedFileName = selectedFile.name;
    if (selectedFile.name.length > maxFileNameLength) {
        trimmedFileName = `${selectedFile.name.substring(0, maxFileNameLength)}...`;
    }
    
    return {valid:true, fileName: trimmedFileName};

        //dispatch({ type: "SET_MESSAGE", payload: `File selected: ${trimmedFileName}` });
        //dispatch({ type: "SET_MODAL_ON", payload: true });
    
}