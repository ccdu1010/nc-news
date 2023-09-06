import { Container, Row, Spinner, Col, Badge } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getArticles } from "../utils/newsApi";
import ArticleCard from './ArticleCard';

function Home(){
    const [articles, setArticles] = useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        getArticles(null, "votes")
        .then((articlesFromApi) => {
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
                    <Row className="articles">
                        {articles.slice(0, 3).map((article) => {
                            return <ArticleCard key={article.article_id} article={article} />
                        })}
                    </Row>
                    <h2>Other News</h2>
                    <Row className="articles">
                        {articles.slice(3)
                            .map((article) => {
                                return <ArticleCard key={article.article_id} article={article} />
                        })}
                    </Row>
                </Container>
            )}
        </>
    );
}
export default Home;