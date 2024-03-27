import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { toast } from "react-toastify";
//import Tags from "../components/Tags";
//import FeatureBlogs from "../components/FeatureBlogs";
//import Trending from "../components/Trending";
//import Search from "../components/Search";
import { isEmpty, isNull } from "lodash";
import { useLocation } from "react-router-dom";
//import Category from "../components/Category";

function Home() {
  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <Trending blogs={trendBlogs} />
          <div className="col-md-8">
            <div className="blog-heading text-start py-2 mb-4">Блоги</div>
            {blogs.length === 0 && location.pathname !== "/" && (
              <>
                <h4>
                  No Blog found with search keyword:{" "}
                  <strong>{searchQuery}</strong>
                </h4>
              </>
            )}
            {blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={user}
                handleDelete={handleDelete}
                {...blog}
              />
            ))}

            {!hide && (
              <button className="btn btn-primary" onClick={fetchMore}>
                Load More
              </button>
            )}
          </div>
          <div className="col-md-3">
            <Search search={search} handleChange={handleChange} />
            <div className="blog-heading text-start py-2 mb-4">Tags</div>
            <Tags tags={tags} />
            <FeatureBlogs title={"Most Popular"} blogs={blogs} />
            <Category catgBlogsCount={categoryCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
