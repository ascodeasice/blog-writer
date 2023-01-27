import { useState, useEffect } from "react";
import PostBlock from "./PostBlock";
import uniqid from 'uniqid';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://blog-api-ascodeasice.up.railway.app/posts")
            .then(res => res.json())
            .then(res => {
                res.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setPosts(res);
            });
    }, []);

    return (
        <div className="postContainer">
            {posts.map((post) => <PostBlock key={uniqid()} post={post} />)}
        </div>
    );
}

export default AllPosts;