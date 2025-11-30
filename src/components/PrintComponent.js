import { printEndpoint, clearDB } from '../contants';
import axios from "axios";

const PdfPrintButton = () => {
const handlerclearDatabase = async () => {

axios.delete(clearDB)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("Error clearing DB:", error);
  });


}
  const handlePrint = async () => {
    try {
    
      window.open(printEndpoint, "_blank");
      
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  return (
    <div className='flex justify-center items-center m-5 gap-5'>
    <button className='btn' onClick={handlePrint}>
      Print PDF
    </button>
    <button className='btn' onClick={handlerclearDatabase}>

        Clear Database
    </button>
    </div>
  );
};

export default PdfPrintButton;
