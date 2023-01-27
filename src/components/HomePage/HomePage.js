import Header from "../Header";
import { useJwt } from "../../contexts/JwtContext";
import LogInForm from "./LogInForm";
import AllPosts from "./AllPosts";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { jwt } = useJwt();

    if (jwt == "" || jwt == undefined) {
        // login page
        return (
            <>
                <Header />
                <LogInForm />
            </>
        );
    } else {
        // home page
        return (
            <>
                <Header />
                <div className="newPostButtonContainer">
                    <Link to='/posts/create'>
                        <button>New Post</button>
                    </Link>
                </div>
                <AllPosts />
            </>
        );
    }
}

export default HomePage;