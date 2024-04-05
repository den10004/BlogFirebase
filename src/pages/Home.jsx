import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import Tags from "../components/Tags";
import FeatureBlogs from "../components/FeatureBlogs";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastParameter } from "./../utils/toast";

function Home({ setActive, user, active }) {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [setActive, active]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("ВЫ хотите удалить блог?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Блог удалён", toastParameter);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div
          className="row mx-0"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="col-md-8">
            <div className="blog-heading text-start py-2 mb-4">Блоги</div>
            {blogs.length === 0 && <h4>Блогов нет</h4>}

            {blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={user}
                handleDelete={handleDelete}
                {...blog}
              />
            ))}
          </div>
          <div className="col-md-3">
            <div className="blog-heading text-start py-2 mb-4">Тэги</div>
            <Tags tags={tags} />
            <FeatureBlogs title={"Самые популярные"} blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
