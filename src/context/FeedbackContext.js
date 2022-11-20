import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [currentlyEditedFeedback, setCurrentlyEditedFeedback] = useState({
    item: {},
    edit: false,
  });

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      //vraća array bez onoga što deletamo
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //set item to be edited
  const editFeedback = (item) => {
    setCurrentlyEditedFeedback({
      item,
      edit: true,
    });
  };

  //is updating feedback item
  const updateFeedbackItem = (id, updatedItem) => {

    setFeedback(
      feedback.map((item) =>
      //stvara novi objekt koji se sastoji od SVIH MOGUĆIH parametara. 
      //Tipa ako updatedItem ima parametar "testinjo", a item nema, onda novi objekt ima. 
      //Ukoliko oba objekta imaju neki isti parametar onda se gledaju objekti od drugog po redu ...prvi, ...drugi
      //konkretno novi objekt dobije od ...item-a id, a od ...updatedItem-a rating i text
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );

    //bez ovoga ne možemo dodati novi item nakon updatea, jer pamti ID starog
    setCurrentlyEditedFeedback({
      item: {},
      edit: false,
    })
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    // Djeci - tj. svemu što je wrappano unutar providera, provideamo feedback
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback, //funkcija koja stavalja item u editable stanje
        currentlyEditedFeedback, //to je item koji se edita, zna za svoj ID
        updateFeedbackItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
