import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { saveArticle, removeArticle } from "../store/reducer/News-Reducer";


function Indonesia() {
  const dispatch = useDispatch();
  const { news, loading, error,savedArticles } = useSelector((state) => state.news);
  const query = useSelector((state) => state.news.query);
  

  const isArticleSaved = (article) => {
    return savedArticles.some((saved) => saved._id === article._id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-lg">
          <span className="loading loading-infinity loading-lg"></span>
        </p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
    <Navbar/>
    <div className="container overflow-x-hidden mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      <h1 className="text-lg">Berita Terbaru {query ? `: "${query}"` : "Indonesia"}</h1>
      <div className="h-1 my-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {news.slice(0, 8).map((article) => (
          <div key={article._id} className="col-span-1">
            <div className="card glass w-full h-full">
              <figure>
                <img
                  src={
                    article.multimedia
                      ? `https://www.nytimes.com/${article.multimedia[0]?.url}`
                      : "https://encr.pw/202ZS"
                  }
                  alt={article.headline.main}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body flex flex-col justify-between">
                <h2 className="card-title text-base">{article.headline.main}</h2>
                <p className="text-sm text-gray-700">
                  {article.abstract || "No description available."}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className={`btn ${
                      isArticleSaved(article) ? "btn-error" : "btn-primary"
                    } btn-sm`}
                    onClick={() =>
                      isArticleSaved(article)
                      ? dispatch(removeArticle(article._id))
                      : dispatch(saveArticle(article))
                    }
                    >
                      {isArticleSaved(article) ? "Unsave" : "Save"}
                  </button>
                  <a
                    href={article.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Indonesia;
