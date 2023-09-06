import Nav from 'react-bootstrap/Nav';

function NavBar({ topics }){
    return (
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {topics.map(topic => {
                return <Nav.Link key={topic} href={`/articles/${topic}`}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</Nav.Link>
            })}
        </Nav>
    )
}
export default NavBar;