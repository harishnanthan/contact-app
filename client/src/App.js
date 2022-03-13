import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Error from "./components/Error";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} exact />
                <Route path="/login" element={<Login />} exact />
                <Route path="/Contact" element={<Contact />} exact />
                <Route path="*" element={<Error />} exact />
            </Routes>
        </BrowserRouter>
    )
}