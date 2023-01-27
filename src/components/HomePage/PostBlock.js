import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const PostBlock = ({ post }) => {
    const formatTime = (timeStr) => {
        return DateTime.fromJSDate(new Date(timeStr)).toFormat("yyyy/MM/dd, hh:mm")
    }

    return (
        <Link to={`/posts/${post._id}`} className="postBlock">
            <h1 className="title">{post.title}</h1>
            <p className="text">{post.text}</p>
            <p className={post.isPublic ? "blue" : "red"}>{post.isPublic ? "Public" : "Private"}</p>
            <p className="time">{formatTime(post.updatedAt)}</p>
        </Link>
    )
}

export default PostBlock;