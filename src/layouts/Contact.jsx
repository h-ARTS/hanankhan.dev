import { useMediaQuery } from "react-responsive"
import Container from "../components/Container"
import Typography from "../components/Typography"
import "./scss/Contact.scss"

const Contact = () => {
    const isTablet = useMediaQuery({ query: "(min-width: 768px)" })

    return (
        <Container id="contact" className="contact">
            <Typography
                tag="h3"
                className={`text upper ${
                    isTablet ? "lead" : "normal"
                } spread bold title`}
            >
                Let's connect
            </Typography>
            <div className="row g-0">
                <div className="email col-12 col-md-11 offset-md-1 col-lg-5 offset-lg-1">
                    <Typography className="contact-item lead display bold">
                        Email
                    </Typography>
                    <Typography className="text upper normal">
                        <a href="mailto:hanan.mufti@outlook.com">
                            hanan.mufti@outlook.com
                        </a>
                    </Typography>
                </div>
                <div className="linkedin col-12 col-md-11 offset-md-1 col-lg-5 offset-lg-1">
                    <Typography className="contact-item lead display bold">
                        LinkedIn
                    </Typography>
                    <Typography className="text upper normal">
                        <a href="#">Chat with me!</a>
                    </Typography>
                </div>
                <div className="github col-12 col-md-11 offset-md-1 col-lg-5 offset-lg-1">
                    <Typography className="contact-item lead display bold">
                        Github
                    </Typography>
                    <Typography className="text upper normal">
                        <a href="#">I do awesome shit here!</a>
                    </Typography>
                </div>
                <div className="twitter col-12 col-md-11 offset-md-1 col-lg-5 offset-lg-1">
                    <Typography className="contact-item lead display bold">
                        Twitter/X
                    </Typography>
                    <Typography className="text upper normal">
                        <a href="#">I might write you back...</a>
                    </Typography>
                </div>
            </div>
        </Container>
    )
}

export default Contact
