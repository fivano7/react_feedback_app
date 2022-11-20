import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {
  //imamo pristup svemu što je u FeedbackContext.Provider value parametru
  const {feedback} = useContext(FeedbackContext)

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }

  //Sa animacijom
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div key={item.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <FeedbackItem
              key={item.id}
              item={item}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  //Bez animacije
  // return (
  //   <div className="feedback-list">
  //     {feedback.map((item) => (
  //       <FeedbackItem
  //         key={item.id}
  //         item={item}
  //       />
  //     ))}
  //   </div>
  // );
}

export default FeedbackList;
