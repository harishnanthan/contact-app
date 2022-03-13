import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"
import PreviewContact from "./PreviewContact"
import "../style/contact.scss"


export default function Contact() {

    let navigate = useNavigate()

    const contactValue = React.useRef(null)

    const [contact, setContact] = React.useState(false)

    React.useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate("/")
        }
        const getData = async () => {
            const res = await axios({
                method: "GET",
                url: "http://localhost:8000/api/contact",
                headers: {
                    id: localStorage.getItem('id')
                }
            })
            setContact(res.data)
        }
        getData();
    }, [navigate])

    let allContact
    if (contact) {
        allContact = contact.map(item => {
            return <PreviewContact key={item._id} item={item} />
        })
    }

    function submitHandler(event) {
        event.preventDefault()

        const form = contactValue.current
        const oneContact = {
            name: form["name"].value,
            phoneNumber: form["phoneNumber"].value,
            email: form["email"].value,
        }

        const postData = async () => {
            oneContact["userId"] = localStorage.getItem("id")
            const res = await axios({
                method: "POST",
                url: "http://localhost:8000/api/contact",
                data: oneContact
            })
            setContact(prevState => [...prevState, res.data.contact])
        }
        postData()
    }


    return (
        <div className="contact-page">
            <form ref={contactValue} onSubmit={submitHandler}>
                <h2>Contact</h2>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={contactValue.name}
                        autoComplete="on"
                        required
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        maxLength={10}
                        value={contactValue.phoneNumber}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={contactValue.email}
                        required
                    />
                </div>
                <div className="add-contact">
                    <button type="submit">Add contact</button>
                </div>
            </form>
            <div className="all-contacts" >
                {allContact}
            </div>
        </div>
    )
}
