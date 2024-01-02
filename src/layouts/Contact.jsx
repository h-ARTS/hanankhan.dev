import React from "react"
import Container from "../components/Container"
import Typography from "../components/Typography"
import "./css/Contact.css"

const Contact = () => {
    return (
        <Container id="contact" className="contact">
            <Typography tag="h3" className="text upper normal spread bold">
                Let's connect
            </Typography>
            <div className="email">
                <Typography className="lead display bold">Email</Typography>
                <Typography className="text upper normal">
                    <a href="mailto:hanan.mufti@outlook.com">
                        hanan.mufti@outlook.com
                    </a>
                </Typography>
            </div>
            <div className="linkedin">
                <Typography className="lead display bold">LinkedIn</Typography>
                <Typography className="text upper normal">
                    <a href="#">No recruiters allowed!</a>
                </Typography>
            </div>
            <div className="github">
                <Typography className="lead display bold">Github</Typography>
                <Typography className="text upper normal">
                    <a href="#">I do awesome shit here!</a>
                </Typography>
            </div>
            <div className="twitter">
                <Typography className="lead display bold">Twitter/X</Typography>
                <Typography className="text upper normal">
                    <a href="#">I might write you back...</a>
                </Typography>
            </div>
        </Container>
    )
}

export default Contact
