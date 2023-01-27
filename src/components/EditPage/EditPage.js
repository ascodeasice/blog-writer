import Header from "../Header";
import PostEditor from "./PostEditor";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useJwt } from "../../contexts/JwtContext";
import { Navigate } from 'react-router-dom'

const EditPage = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const { postId } = useParams();
    const { jwt } = useJwt();

    useEffect(() => {
        fetch(`https://blog-api-ascodeasice.up.railway.app/posts/${postId}`)
            .then(res => res.json())
            .then(res => setPost(res));
    }, []);

    if (jwt == undefined || jwt == "") {
        return (
            <Navigate to='/' />
        )
    } else {
        return (
            <>
                <Header />
                <h1 className="editorTitle">Edit Post</h1>
                <PostEditor post={post} />
            </>
        )
    }
}

export default EditPage;