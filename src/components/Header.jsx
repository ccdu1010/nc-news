import { useState, useEffect } from "react"
import { getTopics } from "../utils/newsApi";
import Nav from "./Nav";
import { Container, Navbar } from "react-bootstrap";

function Header(){
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
            <Container className="p-3">
                <Navbar.Brand href="/">Northcoders News</Navbar.Brand>
                <Nav topics={topics} />
            </Container>
        </Navbar>
    )
}
export default Header;