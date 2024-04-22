import { NavLink } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { convertDate } from "../../utils/converData";
import { useInView } from "react-intersection-observer";

import "./styles.css";

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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "red",
                    marginRight: "10px",
                  }}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="20"
                    height="18"
                    viewBox="0 0 25 22"
                  >
                    <path
                      d="M9.239,21.015 C9.061,21.692 8.677,21.999 8.024,21.999 C5.899,22.002 3.775,21.999 1.650,22.000 C1.207,22.000 0.818,21.851 0.468,21.590 C0.179,21.376 0.060,21.078 0.057,20.720 C0.039,18.755 0.005,16.790 -0.000,14.825 C-0.003,13.672 0.033,12.518 0.061,11.364 C0.083,10.443 0.858,9.694 1.771,9.695 C4.037,9.697 6.304,9.696 8.570,9.706 C8.766,9.706 8.900,9.651 9.007,9.492 C9.571,8.654 10.137,7.819 10.701,6.982 C10.911,6.670 11.093,6.335 11.332,6.049 C11.995,5.256 12.072,4.355 11.923,3.380 C11.827,2.755 11.782,2.121 11.746,1.489 C11.724,1.119 11.902,0.822 12.191,0.580 C13.103,-0.186 14.393,-0.197 15.449,0.580 C16.642,1.458 17.240,2.685 17.443,4.122 C17.620,5.376 17.441,6.605 17.120,7.818 C17.099,7.899 17.078,7.980 17.058,8.061 C17.055,8.077 17.058,8.094 17.058,8.143 C17.146,8.143 17.233,8.143 17.320,8.143 C19.120,8.142 20.920,8.142 22.719,8.141 C23.862,8.140 24.787,8.861 24.969,9.921 C25.099,10.671 24.812,11.300 24.321,11.844 C24.202,11.976 24.177,12.078 24.220,12.257 C24.449,13.208 24.189,14.060 23.632,14.831 C23.508,15.002 23.454,15.142 23.481,15.368 C23.597,16.337 23.357,17.221 22.769,18.009 C22.695,18.108 22.643,18.268 22.662,18.388 C22.936,20.101 21.735,21.160 20.342,21.281 C19.440,21.360 18.528,21.327 17.620,21.329 C15.254,21.334 12.888,21.327 10.522,21.333 C10.072,21.334 9.645,21.277 9.239,21.015 zM22.677,15.362 C22.562,15.362 22.464,15.362 22.366,15.362 C21.116,15.363 19.866,15.364 18.616,15.363 C18.466,15.363 18.313,15.374 18.167,15.347 C17.956,15.307 17.828,15.169 17.840,14.941 C17.852,14.717 17.980,14.590 18.201,14.565 C18.292,14.554 18.384,14.557 18.476,14.557 C19.859,14.558 21.242,14.560 22.626,14.555 C22.716,14.555 22.841,14.530 22.891,14.469 C23.358,13.894 23.601,13.250 23.458,12.493 C23.420,12.292 23.327,12.228 23.121,12.230 C21.804,12.239 20.487,12.235 19.170,12.234 C18.750,12.234 18.545,12.097 18.553,11.822 C18.561,11.557 18.755,11.432 19.167,11.432 C20.567,11.430 21.967,11.431 23.367,11.427 C23.464,11.427 23.580,11.426 23.654,11.377 C24.227,10.991 24.365,10.032 23.929,9.494 C23.605,9.095 23.175,8.943 22.671,8.944 C20.746,8.949 18.821,8.947 16.896,8.948 C16.124,8.948 16.037,8.840 16.227,8.097 C16.516,6.970 16.778,5.839 16.696,4.661 C16.619,3.563 16.289,2.562 15.542,1.735 C15.027,1.165 14.417,0.762 13.604,0.813 C12.859,0.861 12.480,1.272 12.542,2.003 C12.594,2.610 12.685,3.214 12.765,3.818 C12.881,4.703 12.691,5.509 12.170,6.238 C11.923,6.584 11.685,6.938 11.454,7.296 C10.777,8.349 10.146,9.434 9.307,10.373 C9.248,10.438 9.221,10.553 9.221,10.645 C9.216,13.698 9.216,16.751 9.219,19.804 C9.219,19.882 9.230,19.987 9.279,20.035 C9.553,20.299 9.859,20.523 10.261,20.523 C13.478,20.526 16.694,20.527 19.911,20.523 C20.395,20.522 20.852,20.403 21.257,20.125 C21.815,19.741 22.060,18.968 21.801,18.393 C20.750,18.393 19.692,18.394 18.634,18.393 C18.218,18.393 17.801,18.399 17.384,18.388 C17.157,18.381 16.996,18.215 16.999,18.007 C17.001,17.786 17.121,17.648 17.338,17.606 C17.418,17.590 17.503,17.590 17.586,17.590 C19.003,17.589 20.419,17.591 21.836,17.585 C21.941,17.584 22.089,17.556 22.144,17.484 C22.617,16.866 22.782,16.163 22.677,15.362 zM8.400,10.504 C8.277,10.504 8.171,10.504 8.065,10.504 C5.982,10.502 3.900,10.500 1.817,10.498 C1.286,10.498 0.861,10.899 0.860,11.431 C0.854,14.465 0.853,17.500 0.854,20.534 C0.855,20.919 0.921,21.006 1.289,21.129 C1.412,21.171 1.549,21.189 1.680,21.192 C2.088,21.200 2.496,21.195 2.904,21.196 C4.612,21.196 6.319,21.197 8.027,21.196 C8.334,21.196 8.413,21.115 8.414,20.811 C8.415,20.485 8.414,20.159 8.414,19.833 C8.414,16.824 8.414,13.814 8.414,10.804 C8.414,10.714 8.406,10.624 8.400,10.504 z"
                      fill="red"
                    />
                  </svg>
                  &nbsp;{likes.length}
                </div>{" "}
                <NavLink to={`/detail/${id}`}>
                  <div>
                    <svg
                      style={{
                        width: "20px",
                        marginRight: "5px",
                        marginLeft: "10px",
                      }}
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    >
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        sketch:type="MSPage"
                      >
                        <g
                          id="Icon-Set"
                          sketch:type="MSLayerGroup"
                          transform="translate(-360.000000, -255.000000)"
                          fill="red"
                        >
                          <path
                            d="M390,277 C390,278.463 388.473,280 387,280 L379,280 L376,284 L373,280 L365,280 C363.527,280 362,278.463 362,277 L362,260 C362,258.537 363.527,257 365,257 L387,257 C388.473,257 390,258.537 390,260 L390,277 L390,277 Z M386.667,255 L365.333,255 C362.388,255 360,257.371 360,260.297 L360,277.187 C360,280.111 362.055,282 365,282 L371.639,282 L376,287.001 L380.361,282 L387,282 C389.945,282 392,280.111 392,277.187 L392,260.297 C392,257.371 389.612,255 386.667,255 L386.667,255 Z"
                            id="comment-5"
                            sketch:type="MSShapeGroup"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    {comments.length} &nbsp; &nbsp;
                  </div>
                </NavLink>
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
      ) : (
        <div
          style={{ width: "100%", height: "333px", background: "white" }}
        ></div>
      )}
    </div>
  );
};

export default BlogSection;
