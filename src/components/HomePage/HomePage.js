import Header from "../Header";
import { useJwt } from "../../contexts/JwtContext";
import LogInForm from "./LogInForm";
import AllPosts from "./AllPosts";

const HomePage = () => {
    const { jwt, setJwt } = useJwt();

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
                <AllPosts />
            </>
        );
    }
}

export default HomePage;