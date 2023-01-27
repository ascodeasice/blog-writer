import Header from "../Header";
import PostEditor from "./PostEditor";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useJwt } from "../../contexts/JwtContext";
import { Navigate } from 'react-router-dom'
import CommentBlock from "./CommentBlock";
import uniqid from "uniqid";

const EditPage = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const { postId } = useParams();
    const { jwt } = useJwt();

    useEffect(() => {
        if (postId == "create") {
            // creating new post
            setPost(null);
            return;
        }
        fetch(`https://blog-api-ascodeasice.up.railway.app/posts/${postId}`)
            .then(res => res.json())
            .then(res => setPost(res));
    }, []);

    useEffect(() => {
        if (postId == "create") {
            return;
        }
        fetch(`https://blog-api-ascodeasice.up.railway.app/posts/${postId}/comments`)
            .then(res => res.json())
            .then(res => {
                // sort by creation time
                res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setComments(res)
            });
    }, []);

    //  redirect user to log in page if token is invalid
    if (jwt == undefined || jwt == "") {
        return (
            <Navigate to='/' />
        )
    } else {
        return (
            <>
                <Header />
                <h1 className="editorTitle">{post ? "Edit Post" : "New Post"}</h1>
                <PostEditor post={post} />
                <div className="commentList">
                    {
                        comments.map((comment) => <CommentBlock key={uniqid()} comment={comment} />)
                    }
                </div>
            </>
        )
    }
}

export default EditPage;