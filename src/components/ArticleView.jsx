import { Spinner, Badge } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { getArticleById, getCommentsForArticle } from "../utils/newsApi";
import CommentList from './CommentList';
import ArticleVote from './ArticleVote';
import PostComment from './PostComment';

function ArticleView(){
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [votes, setVotes] = useState(0);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    const { article_id } = useParams();

    useEffect(() => {
        setLoading(true)
        setError(false)
        const promises = [
            getArticleById(article_id)
            .then((articleFromApi) => {
                setArticle(articleFromApi);
                setVotes(articleFromApi.votes);
            }),
            getCommentsForArticle(article_id)
            .then((commentsFromApi) => {
                setComments(commentsFromApi);
            })
        ]
        Promise.all(promises)
        .then(() => {
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
                    <PostComment articleId={article_id} comments={comments} setComments={setComments} />
                    <CommentList comments={comments} />
                </section>
            )}
        </>
    );
}
export default ArticleView;