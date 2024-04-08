import { NavLink } from "react-router-dom";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="tags">
        {tags?.map((tag, index) => (
          <p className="tag" key={index}>
            <NavLink
              to={`/tag/${tag}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {tag}
            </NavLink>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tags;
