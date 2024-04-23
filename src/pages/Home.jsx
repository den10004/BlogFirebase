import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import Tags from "../components/Tags";
import Category from "../components/Category";
import FeatureBlogs from "../components/FeatureBlogs";

// eslint-disable-next-line react/prop-types
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

  let uniqueCategory = [];
  blogs.filter(function (item) {
    let i = uniqueCategory.findIndex((i) => i.category == item.category);
    if (i <= -1) {
      uniqueCategory.push(item);
    }
    return null;
  });

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div
          className="row mx-0"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "66%" }}>
            <div
              className="blog-heading text-start py-2 mb-4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Блоги
              <div>
                <p style={{ marginBottom: "0", fontSize: "16px" }}>
                  Количество блогов: {blogs.length}
                </p>
              </div>
            </div>

            {blogs.length === 0 && (
              <h4 className="text-start py-2 mb-4">Блогов нет</h4>
            )}

            {blogs?.map((blog) => (
              <BlogSection key={blog.id} user={user} {...blog} />
            ))}
          </div>
          <div style={{ width: "25%" }}>
            <div className="blog-heading text-start py-2 mb-4">Тэги</div>
            <Tags tags={tags} />
            <div className="blog-heading text-start py-2 mb-4">Категории</div>

            {uniqueCategory?.map((uniqCat) => (
              <Category key={uniqCat.id} uniqCat={uniqCat} />
            ))}

            <FeatureBlogs title={"Популярные блоги"} blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
