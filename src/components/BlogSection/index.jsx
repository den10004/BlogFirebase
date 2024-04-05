import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import "./styles.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div className="row pb-4" key={id}>
      <div className="col-md-5">
        <div className="hover-blogs-img">
          <div className="blogs-img">
            {imgUrl ? (
              <img src={imgUrl} alt={title} />
            ) : (
              <div
                style={{
                  backgroundColor: "gray",
                  height: "100%",
                  opacity: "0.4",
                  padding: "10px",
                }}
              >
                <h3>Нет изображения</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-md-7">
        <Link to={`/detail/${id}`}>
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">{author}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start">
            <ReactMarkdown children={description} />
          </div>
        </Link>

        {user && user.uid === userId && (
          <div style={{ float: "right" }}>
            <FontAwesome
              name="trash"
              style={{ margin: "5px", cursor: "pointer" }}
              size="2x"
              onClick={() => handleDelete(id)}
            />

            <Link to={`/update/${id}`}>
              <FontAwesome
                name="edit"
                style={{ cursor: "pointer" }}
                size="2x"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
