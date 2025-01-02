import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const businessName = searchParams.get("businessName");

    if (businessName) {
      axios
        .get(`${API_URL}/searchpost/search?businessName=${businessName}`)
        .then((response) => {
          setProjects(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching projects");
          setLoading(false);
        });
    }
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto my-20 h-[600px]">
      <h1>Search Results</h1>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <a href={`/projectdetail/${project._id}`}>
                {project.businessName}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div>No projects found</div>
      )}
    </div>
  );
};

export default SearchResults;
