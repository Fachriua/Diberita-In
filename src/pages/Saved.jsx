import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeArticle } from "../store/reducer/News-Reducer";
import Navbar from "../components/Navbar";

function Saved() {
  const { savedArticles } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  if (savedArticles.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-20 py-6">
          <h1 className="text-lg">Saved Articles</h1>
          <div className="h-1 my-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <p className="text-center text-gray-600">No articles saved yet.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container overflow-x-hidden mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
        <h1 className="text-lg">Saved Articles</h1>
        <div className="h-1 my-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Abstract</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedArticles.map((article) => (
              <tr key={article._id}>
                <td className="border border-gray-300 px-4 py-2">{article.headline.main}</td>
                <td className="border border-gray-300 px-4 py-2">{article.abstract}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => dispatch(removeArticle(article._id))}
                  >
                    Remove
                  </button>
                  <a
                    href={article.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm mt-3"
                  >
                    Read More
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Saved;
