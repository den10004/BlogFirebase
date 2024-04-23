import { NavLink } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { convertDate } from "../../utils/converData";
import { useInView } from "react-intersection-observer";

import "./styles.css";
import Like from "../Like";
import CommentIcon from "../CommentIcon";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  author,
  timestamp,
  likes,
  comments,
  view,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <div style={{ position: "relative" }}>
          <div className="row pb-4" key={id}>
            <div className="col-md-5">
              <div className="hover-blogs-img">
                <NavLink to={`/detail/${id}`}>
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
                </NavLink>
              </div>
            </div>
            <div className="col-md-7">
              <NavLink to={`/detail/${id}`}>
                <div className="text-start">
                  {category === "Путешевствия" && (
                    <h6 className="category catg-color bgc4287f5">
                      {category}
                    </h6>
                  )}
                  {category === "Технологии" && (
                    <h6 className="category catg-color bgcc43421">
                      {category}
                    </h6>
                  )}
                  {category === "Новости" && (
                    <h6 className="category catg-color bgc32CD32">
                      {category}
                    </h6>
                  )}
                  {category === "Бизнес" && (
                    <h6 className="category catg-color bgcc808000">
                      {category}
                    </h6>
                  )}

                  {category !== "Путешевствия" &&
                    category !== "Технологии" &&
                    category !== "Бизнес" &&
                    category !== "Новости" && (
                      <h6 className="category catg-color bgc000000">
                        {category}
                      </h6>
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
              </NavLink>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  right: 0,
                  bottom: "10px",
                }}
              >
                <Like likes={likes} /> &nbsp; &nbsp;
                <NavLink to={`/detail/${id}`}>
                  <CommentIcon comments={comments} />
                </NavLink>
                &nbsp; &nbsp;
                <div>
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  &nbsp;
                  {view}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ width: "100%", height: "333px", background: "white" }}
        ></div>
      )}
    </div>
  );
};

export default BlogSection;
