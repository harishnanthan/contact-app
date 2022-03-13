import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../style/login.scss"

export default function Login() {

    let navigate = useNavigate();

    const [loginValue, setLoginValue] = React.useState({
        email: "",
        password: "",
    })

    function changeHandler(event) {
        const { name, value } = event.target
        setLoginValue(prevState => {
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
            url: 'http://localhost:8000/api/users/login',
            data: loginValue,
        }).then((res) => {
            navigate('/contact')
            // console.log(res.data.userId)
            localStorage.setItem(
                "id", res.data.userId
            )
        }).catch((e) => {
            navigate("*")
            console.log(e.response.data.message)
        })
    }


    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        value={loginValue.email}
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
                        value={loginValue.password}
                        required
                    />
                </div>
                <div className="signup">
                    Don't have an account?
                    <button onClick={() => navigate('/')} >Sign up</button>
                </div>
                <div className="submit-button">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}