import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { useJwt } from '../../contexts/JwtContext';
import uniqid from 'uniqid';


const PostEditor = ({ post }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState([]);
    const { jwt } = useJwt();
    const { postId } = useParams();

    useEffect(() => {
        // set info when post is fetched
        if (!post) {
            return;
        }
        setTitle(post.title);
        setText(post.text);
        setIsPublic(post.isPublic);
    }, [post])

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }

    const changeText = (event) => {
        setText(event.target.value);
    }

    const changePublic = (event) => {
        setIsPublic(event.target.checked);
    }

    const createPost = () => {
        const formData = {
            title: title,
            text: text,
            author: "63cf8534f3ac5f8a35aab238",
            isPublic: isPublic ? "on" : "off",
        };

        fetch(`https://blog-api-ascodeasice.up.railway.app/posts`, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(res => {
                if (Array.isArray(res)) {
                    setErrors(res);
                }
                setUpdated(true);
            });
    }

    const updatePost = () => {
        const formData = {
            title: title,
            text: text,
            author: post.author._id,
            isPublic: isPublic ? "on" : "off",
        };

        fetch(`https://blog-api-ascodeasice.up.railway.app/posts/${postId}`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(res => {
                if (Array.isArray(res)) {
                    setErrors(res);
                }
                setUpdated(true);
            });
    }

    if (updated) {
        return <Navigate to="/" />
    } else {
        return (
            <div className="editorPage">
                <div className="editor">
                    <textarea className="title" placeholder="Title" value={title} onChange={changeTitle} />
                    <textarea className="textInput" placeholder="post text" value={text} onChange={changeText} />
                    <label htmlFor="isPublic"><input onChange={changePublic} id='isPublic' type="checkbox" checked={isPublic} />Public</label>
                    <button className="submitButton"
                        onClick={post ? updatePost : createPost}>{post ? "Update" : "Create"}
                    </button>

                    <ul className="errorList">
                        {errors.map(error => <li key={uniqid()} className="error">{error.msg}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default PostEditor;