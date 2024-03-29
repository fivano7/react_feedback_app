import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import Post from "./components/Post";
import Post2 from "./components/Post2";
import Card from "./components/shared/Card";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      //vraća array bez onoga što deletamo
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  return (
      <Router>
        <Header text="Feedback UI" />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList
                    feedback={feedback}
                    handleDelete={deleteFeedback}
                  />
                </>
              }
            />

            <Route path="/about" element={<AboutPage />} />

            {/* http://localhost:3000/post/3/pero - kad unesemo taj link vrati nam Post component sa tim podacima u linku preko GET-a*/}
            <Route path="/post/:id/:name" element={<Post/>}/>

              {/* *-omogućava dodavanje drugih ruta poslije /post2/ */}
            <Route path="/post2/*" element={<Post2/>}/>
            
          </Routes>

          {/* <Card>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </Card> */}

          <AboutIconLink />
        </div>
      </Router>
  );
}

export default App;
