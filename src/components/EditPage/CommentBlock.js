import { DateTime } from "luxon";
import { useParams } from "react-router";
import { useJwt } from "../../contexts/JwtContext";
import { useState } from "react";

const CommentBlock = ({ comment }) => {
    const [deleted, setDeleted] = useState(false);
    const { postId } = useParams();
    const { jwt } = useJwt();

    const formatTime = (timeStr) => {
        return DateTime.fromJSDate(new Date(timeStr)).toFormat("yyyy/MM/dd, HH:mm")
    }

    const deleteComment = () => {
        fetch(`https://blog-api-ascodeasice.up.railway.app/posts/${postId}/comments/${comment._id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                // returns updated post
                if (res._id === comment._id) {
                    setDeleted(true);
                }
            });
    }

    if (deleted) {
        return <></>
    } else {
        return (
            <div className="commentBlock">
                <p className="authorName">{comment.authorName}</p>
                <p className="text">{comment.text}</p>
                <p className="time">{formatTime(comment.createdAt)}</p>
                <button className="deleteComment" onClick={deleteComment}>Delete</button>
            </div>
        );
    }
}

export default CommentBlock;