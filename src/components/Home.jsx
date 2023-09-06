import { Container, Row, Spinner, Col, Badge } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getArticles } from "../utils/newsApi";

function Home(){
    const [articles, setArticles] = useState([]);
    const [topArticle, setTopArticle] = useState({});
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        getArticles(null, "votes")
        .then((articlesFromApi) => {
            const topArticle = articlesFromApi.pop();
            setTopArticle(topArticle);
            setArticles(articlesFromApi);
            setLoading(false);
        })
        .catch((errorFromApi) => {
            console.error(errorFromApi);
            setLoading(false);
            setError(true);
        })
    }, []);

    return (
        <>
            {loading ? (
                <Container className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" className="loading">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
            ) : error ? (
                <h1>Sorry something went wrong</h1>
            ) : (
                <Container id="articles" className="p-5 mb-1 bg-light rounded-3">
                    <h1>Top News</h1>
                    <Row md={2}>
                        <Col key={topArticle.article_id} className="top-article article" md={8}>
                            <Link to={`articles/${topArticle.article_id}`}>
                                <img src={topArticle.article_img_url} />
                                <Container>
                                    <Badge bg="secondary">{topArticle.topic}</Badge>
                                    <h2>{topArticle.title}</h2>
                                </Container>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="articles" md={2} lg={3}>
                        {articles.map((article) => {
                            return <Col key={article.article_id} className="article">
                                <Link to={`articles/${article.article_id}`}>
                                    <img src={article.article_img_url} />
                                    <Container>
                                        <Badge bg="secondary">{article.topic}</Badge>
                                        <h2>{article.title}</h2>
                                    </Container>
                                </Link>
                            </Col>
                        })}
                    </Row>
                </Container>
            )}
        </>
    );
}
export default Home;