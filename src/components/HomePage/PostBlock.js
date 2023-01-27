import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { useState } from "react";
import { useJwt } from "../../contexts/JwtContext";

const PostBlock = ({ post }) => {
    const [deleted, setDeleted] = useState(false);
    const { jwt } = useJwt();

    const formatTime = (timeStr) => {
        return DateTime.fromJSDate(new Date(timeStr)).toFormat("yyyy/MM/dd, HH:mm")
    }

    const deletePost = () => {
        fetch(`https://blog-api-ascodeasice.up.railway.app/posts/${post._id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(res => {
                // returns deleted post when success
                if (res._id == post._id) {
                    setDeleted(true);
                }
            });
    }

    if (deleted) {
        return <></>
    } else {
        return (
            <div className="postBlockContainer">
                <Link to={`/posts/${post._id}`} className='postBlock'>
                    <h1 className="title">{post.title}</h1>
                    <p className="text">{post.text}</p>
                    <p className={post.isPublic ? "blue" : "red"}>{post.isPublic ? "Public" : "Private"}</p>
                    <p className="time">{formatTime(post.updatedAt)}</p>
                </Link>
                <button onClick={deletePost}>Delete</button>
            </div>
        );
    }
}

export default PostBlock;