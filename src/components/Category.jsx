import { NavLink } from "react-router-dom";

const Category = ({ uniqCat }) => {
  return (
    <>
      <NavLink to={`/category/${uniqCat.category}`}>
        <span>
          {uniqCat.category === "Путешевствия" && (
            <h6
              className="category catg-color bgc4287f5"
              style={{ marginRight: "10px" }}
            >
              {uniqCat.category}
            </h6>
          )}
          {uniqCat.category === "Технологии" && (
            <h6
              className="category catg-color bgcc43421"
              style={{ marginRight: "10px" }}
            >
              {uniqCat.category}
            </h6>
          )}
          {uniqCat.category === "Новости" && (
            <h6
              className="category catg-color bgc32CD32"
              style={{ marginRight: "10px" }}
            >
              {uniqCat.category}
            </h6>
          )}
          {uniqCat.category === "Бизнес" && (
            <h6
              className="category catg-color bgcc808000"
              style={{ marginRight: "10px" }}
            >
              {uniqCat.category}
            </h6>
          )}
          {uniqCat.category !== "Путешевствия" &&
            uniqCat.category !== "Технологии" &&
            uniqCat.category !== "Бизнес" &&
            uniqCat.category !== "Новости" && (
              <h6
                className="category catg-color bgc000000"
                style={{ marginRight: "10px" }}
              >
                {uniqCat.category}
              </h6>
            )}
        </span>
      </NavLink>
    </>
  );
};

export default Category;
