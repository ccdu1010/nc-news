import { Spinner, Badge } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { getArticleById } from "../utils/newsApi";

function ArticleView(){
    const [article, setArticle] = useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    const { article_id } = useParams();

    useEffect(() => {
        setLoading(true)
        setError(false)
        getArticleById(article_id)
        .then((articleFromApi) => {
            setArticle(articleFromApi);
            setLoading(false);
        })
        .catch((errorFromApi) => {
            console.error(errorFromApi);
            setLoading(false);
            setError(true);
        })
    }, [article_id]);

    return (
        <>
            {loading ? (
                <section className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" className="loading">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </section>
            ) : error ? (
                <h1>Sorry something went wrong</h1>
            ) : (
                <section id="article-view" className="article-view container">
                    <h1>{article.title}</h1>
                    <Badge>{article.topic}</Badge>
                    <time className="datetime">{new Date(article.created_at).toDateString()}</time>
                    <img src={article.article_img_url} />
                    <span className="author">By {article.author}</span>
                    <main>{article.body}</main>
                </section>
            )}
        </>
    );
}
export default ArticleView;