import { Spinner, Badge } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { getArticleById } from "../utils/newsApi";
import CommentList from './CommentList';
import ArticleVote from './ArticleVote';

function ArticleView(){
    const [article, setArticle] = useState([]);
    const [votes, setVotes] = useState(0);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    const { article_id } = useParams();

    useEffect(() => {
        setLoading(true)
        setError(false)
        getArticleById(article_id)
        .then((articleFromApi) => {
            setArticle(articleFromApi);
            setVotes(articleFromApi.votes)
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
                    <Badge className="bg-success">{article.topic}</Badge>
                    <ArticleVote articleId={article_id} votes={votes} setVotes={setVotes} />
                    <time className="datetime">{new Date(article.created_at).toDateString()}</time>
                    <figure>
                        <img src={article.article_img_url} />
                    </figure>
                    <span className="author">By {article.author}</span>
                    <main>{article.body}</main>
                    <CommentList articleId={article_id} setError={setError}/>
                </section>
            )}
        </>
    );
}
export default ArticleView;