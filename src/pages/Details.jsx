import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeatureBlogs from "../components/FeatureBlogs";
import Tags from "../components/Tags";
import { db } from "../firebase";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function Details({ setActive, user }) {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

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

  const getBlogDetail = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
    let tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
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
          <span>{blog?.timestamp.toDate().toDateString()}</span>
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
                {blog?.timestamp.toDate().toDateString()}
              </span>

              <ReactMarkdown children={blog?.description} />

              <div className="">
                <Tags tags={blog?.tags} />
              </div>
              <br />
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
