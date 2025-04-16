import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "../components/AppBar";
import { LoaderFullBlog } from "../components/LoaderFullBlog";
import { useEffect, useState } from "react";
import { useSpecificBlogs } from "../hooks/useSpecificBlogs";
import { BlogCard } from "../components/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BtnLoader } from "../components/BtnLoader";

export default function Myblogs() {
  const navigate = useNavigate();
  const [authLoading, auth] = useAuth();
  const [deleting, setDeleting] = useState({
    isdeleting: false,
    id: ''
  });

  useEffect(() => {
    if (auth == false && authLoading == false) {
      navigate("/signup");
    }
  }, [authLoading]);

  const { loading, blogs } = useSpecificBlogs();

  if (authLoading) {
    return <LoaderFullBlog />;
  } else if (loading) {
    return (
      <div>
        <div>
          <AppBar />
        </div>
        <div className="flex justify-center">
          <LoaderFullBlog />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <AppBar />
        </div>
        {blogs !== undefined ? (
          <div>
            {blogs.map((b) => {
              return (
                <div
                  key={b.id}
                  className="flex flex-col gap-3 items-center">
                  <BlogCard
                    blogId={b.id}
                    publishDate={b.createdAt.toString().substring(0, 10)}
                    authorname={b.authorName}
                    title={b.title}
                    content={b.content}
                  />
                  <div className="flex justify-around w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
                    <button
                      onClick={async () => {
                        try {
                          setDeleting(d => ({...d, isdeleting: true, id: b.id}));
                          const res = await axios.delete(
                            `${BACKEND_URL}/api/v1/user/blog/${b.id}`,
                            {
                              headers: {
                                Authorization: localStorage.getItem("mediumBlog_token"),
                              },
                            }
                          );
                          alert(res.data.message);
                          window.location.href = `/myblogs`;
                        } catch (e) {
                          if (axios.isAxiosError(e)) {
                            alert(e.response?.data.message);
                          } else {
                            alert("Unable to delete post");
                          }
                        } finally {
                          setDeleting(d => ({...d, isdeleting: false, id: ''}));
                        }
                      }}
                      className="w-24 py-2 bg-red-800 text-white font-bold flex items-center justify-center"
                    >
                      {deleting.isdeleting && deleting.id === b.id  ? (<BtnLoader />) : 'Delete'}
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/update/${b.id}`)
                      }}
                      className="py-2 w-24 bg-green-800 text-white font-bold">
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="font-bold text-3xl text-gray-700 text-center">
            No posts found...
          </div>
        )}
      </div>
    );
  }
}
