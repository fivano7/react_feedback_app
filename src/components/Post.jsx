import { useParams } from "react-router-dom";

function Post() {
  const params = useParams();

  return (
    <div>
      {/* .id jer smo u App.js imali <Route path="/post/:id" element={<Post/>}/>, 
        pa je link http://localhost:3000/post/100 pa je params.id = 100 */}
      <h1>Post {params.id}</h1>

      {/* Ovdje smo dodali i  path="/post/:id"/:name */}
      <h1>Name {params.name}</h1>
    </div>
  );
}

export default Post;
