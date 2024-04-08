import { NavLink } from "react-router-dom";

const Category = ({ uniqCat }) => {
  // console.log(uniqCat);
  return (
    <>
      <NavLink to={`/category/${uniqCat.category}`}>
        <div className="row pb-4">
          <span className="category catg-color bgc4287f5">
            {uniqCat.category}
          </span>
        </div>
      </NavLink>
    </>
  );
};

export default Category;
