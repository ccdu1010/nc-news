import { useState, useEffect } from "react"
import { useUserContext } from "../contexts/UserContext";
import { getTopics } from "../utils/newsApi";
import Nav from "./Nav";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header(){
    const {user, setUser} = useUserContext();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics()
        .then((topicsFromApi) => {
            setTopics(topicsFromApi.map(topic => topic.slug));
        })
        .catch((errorFromApi) => {
            console.error(errorFromApi);
        })
    }, []);

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">Northcoders News</Navbar.Brand>
                <Nav topics={topics} />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    {user ? (
                        <>Signed In as {user.username}</>
                    ) : (
                        <Link to="sign-in">Sign In</Link>
                    )}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;