import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();
  return (
    <>
      <form className="row blog-form">
        <div className="col-12 py-3">
          <textarea
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="form-control description"
          />
        </div>
      </form>
      {!userId ? (
        <>
          <h5>Войдите, что-бы оставить комментарий</h5>
          <button className="btn btn-success" onClick={() => navigate("/auth")}>
            Логин
          </button>
        </>
      ) : (
        <>
          <button
            disabled={!userComment}
            className="btn btn-primary"
            type="submit"
            onClick={handleComment}
          >
            Комментарии
          </button>
        </>
      )}
    </>
  );
};

export default CommentBox;
