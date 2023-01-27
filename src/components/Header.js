import Github from '../assets/github.svg';
import { Link } from "react-router-dom"

const Header = () => {

    return (
        <div className="header">
            <a href='https://github.com/ascodeasice/blog-writer'>
                <img className='githubLogo' src={Github} />
            </a>
            <Link to="/">
                <h1 className='heading'>ascodeasice's blog</h1>
            </Link>
        </div>
    );
}

export default Header;