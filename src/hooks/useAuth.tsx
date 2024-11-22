import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useAuth = () => {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        axios.post(`${BACKEND_URL}/api/v1/user/me`,{},{
            headers: {
                Authorization: localStorage.getItem("mediumBlog_token")
            }
        }).then(res => {
            if(res.data.message == "auth passed")
                setAuth(true)
        })
    },[])
    return auth;
}