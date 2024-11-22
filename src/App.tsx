import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import BlogsBulk from "./pages/BlogsBulk"
import { FullBlog } from "./pages/FullBlog";
import { Publish } from "./pages/Publish";

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog/bulk" element={<BlogsBulk />} />
      <Route path="/blog" element={<FullBlog />} />
      <Route path="/publish" element={<Publish />} />
    </Routes>
  </BrowserRouter>
}