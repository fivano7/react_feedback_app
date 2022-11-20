import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [currentlyEditedFeedback, setCurrentlyEditedFeedback] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=rating&_order=desc`);

    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {

      await fetch(`/feedback/${id}`, {
        method: "DELETE",
      });

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
  const updateFeedbackItem = async (id, updatedItem) => {

    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) =>
        //stvara novi objekt koji se sastoji od SVIH MOGUĆIH parametara.
        //Tipa ako data ima parametar "testinjo", a item nema, onda novi objekt ima.
        //Ukoliko oba objekta imaju neki isti parametar onda se gledaju objekti od drugog po redu ...prvi, ...drugi
        //konkretno novi objekt dobije od ...item-a id, a od ...data-a rating i text
        item.id === id ? { ...item, ...data } : item
      )
    );

    //bez ovoga ne možemo dodati novi item nakon updatea, jer pamti ID starog
    setCurrentlyEditedFeedback({
      item: {},
      edit: false,
    });
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch(`/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  return (
    // Djeci - tj. svemu što je wrappano unutar providera, provideamo feedback
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
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
