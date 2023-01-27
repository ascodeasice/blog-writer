import { Link } from "react-router-dom";

const PostBlock = ({ post }) => {
    return (
        <Link to={`/posts/${post._id}`} className="postBlock">
            <h1 className="title">{post.title}</h1>
            <p className="text">{post.text}</p>
        </Link>
    )
}

export default PostBlock;