import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import FeatureBlogs from "../components/FeatureBlogs";
import Tags from "../components/Tags";
import { db } from "../firebase";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { convertDate } from "../utils/converData";
import Like from "../components/Like";
import CommentBox from "../components/CommentsBox";
import UserComments from "../components/UserComments";

import { toast } from "react-toastify";
import FontAwesome from "react-fontawesome";
import { toastParameter } from "../utils/toast";
import { useNavigate } from "react-router-dom";

function Details({ setActive, user }) {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  let [likes, setLikes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(
        blogRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const docSnapshot = await getDocs(recentBlogs);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getRecentBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("ВЫ хотите удалить блог?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Блог удалён", toastParameter);
        setLoading(false);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getBlogDetail = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
    let tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    setTags(uniqueTags);
    setBlog(blogDetail.data());
    const relatedBlogsQuery = query(
      blogRef,
      where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
    );

    const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });

    setActive(null);
    setLoading(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }
      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div
            className="row"
            style={{
              width: "100%;",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="col-md-8 details-description">
              <span className="meta-info">
                Создан <p className="author">{blog?.author}</p> -&nbsp;
                {convertDate(new Date(blog?.timestamp.seconds * 1000))}
              </span>

              <ReactMarkdown children={blog?.description} />
              {user && user.uid === userId && (
                <div style={{ float: "right" }}>
                  <FontAwesome
                    name="trash"
                    style={{ margin: "5px", cursor: "pointer" }}
                    size="2x"
                    onClick={() => handleDelete(id)}
                  />

                  <NavLink to={`/update/${id}`}>
                    <FontAwesome
                      name="edit"
                      style={{ cursor: "pointer" }}
                      size="2x"
                    />
                  </NavLink>
                  <Like handleLike={handleLike} likes={likes} userId={userId} />
                </div>
              )}
              <br />

              <div className="custombox">
                <div className="scroll">
                  <h4 className="small-title">
                    Комментариев: {comments?.length}
                  </h4>
                  {isEmpty(comments) ? (
                    <UserComments msg={"Комментариев нет"} />
                  ) : (
                    <>
                      {comments?.map((comment) => (
                        <UserComments {...comment} />
                      ))}
                    </>
                  )}
                </div>
              </div>
              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </div>
            <div className="col-md-3">
              <div className="blog-heading  py-2 mb-4">Тэги</div>
              <Tags tags={tags} />
              <FeatureBlogs title={"Recent Blogs"} blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
