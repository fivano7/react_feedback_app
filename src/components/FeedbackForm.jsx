import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

//bitno razlikovat rating ovdje i selected unutar RatingSelect
function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, currentlyEditedFeedback, updateFeedbackItem } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (currentlyEditedFeedback.edit === true) {
      setBtnDisabled(false);
      setText(currentlyEditedFeedback.item.text);
      setRating(currentlyEditedFeedback.item.rating);
    }
  }, [currentlyEditedFeedback]);

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      //nije prazan i dulji od 10
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //submitanje u sam file

    //Može i ovako:
    //   const newFeedback = {text,rating};

    if (text.trim().length > 10) {
      const newFeedback = {
        text: text,
        rating: rating,
      };

      //currently edited item već u sebi ima ID
      if (currentlyEditedFeedback.edit === true) {
        updateFeedbackItem(currentlyEditedFeedback.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
