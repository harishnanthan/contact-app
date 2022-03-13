import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../style/signup.scss"


export default function SignUp() {

    let navigate = useNavigate()

    const [signupValue, setSignupValue] = React.useState({
        email: "",
        password: "",
        secret: ""
    })

    function changeHandler(event) {
        const { name, value } = event.target
        setSignupValue(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    function submitHandler(event) {
        event.preventDefault()
        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/users/signup',
            data: signupValue,
        }).then(
            navigate(`/login`)
        ).catch((e) => {
            navigate("*")
            console.log(e.response.data.message)
        })
    }


    return (
        <div className="signup-page">
            <h1>Contact App</h1>
            <h2>Signup</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        value={signupValue.email}
                        autoComplete="on"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={changeHandler}
                        value={signupValue.password}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="secret"
                        placeholder="Secret"
                        onChange={changeHandler}
                        value={signupValue.secret}
                        required
                    />
                </div>
                <div className="login">
                    already have an account?
                    <button onClick={() => navigate('/login')} >Login</button>
                </div>
                <div className="submit-button">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}