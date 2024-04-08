import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import "./styles.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { convertDate } from "../../utils/converData";

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
    <>
      <Link to={`/detail/${id}`}>
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
                    <h3 style={{ color: "black" }}>Нет изображения</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="text-start">
              {category === "Путешевствия" && (
                <h6 className="category catg-color bgc4287f5">{category}</h6>
              )}
              {category === "Технологии" && (
                <h6 className="category catg-color bgcc43421">{category}</h6>
              )}
              {category === "Новости" && (
                <h6 className="category catg-color bgc32CD32">{category}</h6>
              )}
              {category === "Бизнес" && (
                <h6 className="category catg-color bgcc808000">{category}</h6>
              )}

              {category !== "Путешевствия" &&
                category !== "Технологии" &&
                category !== "Бизнес" &&
                category !== "Новости" && (
                  <h6 className="category catg-color bgc000000">{category}</h6>
                )}

              <span className="title py-2">{title}</span>
              <span className="meta-info">
                <p className="author">{author}</p> -&nbsp;
                {convertDate(new Date(timestamp.seconds * 1000))}
              </span>
            </div>
            <div className="short-description text-start">
              <ReactMarkdown children={description} />
            </div>

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
          </div>{" "}
        </div>{" "}
      </Link>
    </>
  );
};

export default BlogSection;
