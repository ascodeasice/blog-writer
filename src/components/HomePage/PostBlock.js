import { Link } from "react-router-dom";

const PostBlock = ({ post }) => {
    return (
        <Link to={`/posts/${post._id}`} className="postBlock">
            <h1 className="title">{post.title}</h1>
            <p className="text">{post.text}</p>
            <p className={post.isPublic ? "blue" : "red"}>{post.isPublic ? "Public" : "Private"}</p>
        </Link>
    )
}

export default PostBlock;