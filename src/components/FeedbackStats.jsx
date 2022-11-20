import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {

  const {feedback} = useContext(FeedbackContext)

    //računanje prosjeka reduce(funkcija, početni accumulator - 0). Na kraju je to suma/duljina = prosjek 
    let average = feedback.reduce((accumulator, current) => {
        return accumulator + current.rating
    }, 0) / feedback.length

    average = average.toFixed(1).replace(/[.,]0$/, "") //9.0 je 9, a 8.5 je 8.5


  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats