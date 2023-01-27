import { useState } from "react";
import { useJwt } from "../../contexts/JwtContext";
import uniqid from 'uniqid';

const LogInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { jwt, setJwt } = useJwt();

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const submit = () => {
        const body = {
            username: username,
            password: password,
        }

        fetch("https://blog-api-ascodeasice.up.railway.app/logIn", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((res) => res.json())
            .then((res) => {
                if (res.message === "invalid input") {
                    setErrors(res.errors);
                    return true;
                }
                if (res.message === "Wrong password") {
                    setErrors([{ msg: res.message }]);
                    return true;
                }
                setJwt(res.token);
            });
    }

    return (
        <div className="center">
            <div className="logInForm">
                <h1 className="title">Log In to edit posts</h1>
                <label htmlFor="username">User name</label>
                <input onChange={changeUsername} id="username" type="text" placeholder="ascodeasice is the only user" />
                <label htmlFor="password">Password</label>
                <input onChange={changePassword} id="password" type="password" placeholder="password" />
                <button onClick={submit} className="submitButton">Submit</button>
                <ul>
                    {errors.map(error => <li key={uniqid()} className="error"> {error.msg}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default LogInForm;