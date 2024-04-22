import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const FeatureBlogs = ({ blogs, title }) => {
  // eslint-disable-next-line react/prop-types
  blogs.sort(function (a, b) {
    return b.view - a.view;
  });

  // eslint-disable-next-line react/prop-types
  const slicedArray = blogs.slice(0, 5);

  const navigate = useNavigate();
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-2 mb-4">{title}</div>
      {slicedArray?.map((item) => (
        <div
          className="row pb-3"
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className="col-5 align-self-center">
            {item.imgUrl ? (
              <img
                src={item.imgUrl}
                alt={item.title}
                className="most-popular-img"
              />
            ) : (
              <div
                style={{
                  backgroundColor: "gray",
                  height: "80px",
                  opacity: "0.4",
                }}
              ></div>
            )}
          </div>
          <div className="col-7 padding">
            <div className="text-start most-popular-font">{item.title}</div>
            <div className="text-start most-popular-font-meta">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBlogs;
