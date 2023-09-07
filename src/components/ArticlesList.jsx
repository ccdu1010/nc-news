import { Container, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { getArticles } from "../utils/newsApi";
import ArticleCard from './ArticleCard';

function ArticlesList(){
    const [articles, setArticles] = useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    const { topic } = useParams();
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        getArticles(topic)
        .then((articlesFromApi) => {
            setArticles(articlesFromApi);
            setLoading(false);
        })
        .catch((errorFromApi) => {
            console.error(errorFromApi);
            setLoading(false);
            setError(true);
        })
    }, [topic]);

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
                <Container id="articles" className="p-5 mb-4 bg-light rounded-3">
                    <Row>
                        {articles.map((article) => {
                            return <ArticleCard key={article.article_id} article={article} />
                        })}
                    </Row>
                </Container>
            )}
        </>
    );
}
export default ArticlesList;