import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { getCommentsForArticle } from "../utils/newsApi";
import CommentCard from './CommentCard';

function CommentList({ articleId, setError }){
    const [comments, setComments] = useState([]);
    const [loading, setLoading]= useState(false);

    useEffect(() => {
        setLoading(true)
        setError(false)
        getCommentsForArticle(articleId)
        .then((commentsFromApi) => {
            setComments(commentsFromApi);
            setLoading(false);
        })
        .catch((errorFromApi) => {
            console.error(errorFromApi);
            setLoading(false);
            setError(true);
        })
    }, [articleId]);

    return (
        <>
            {loading ? (
                <section className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" className="loading">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </section>
            ) : (
                <section className="comments-view">
                    <h5>All Comments</h5>
                    {comments.map((comment) => {
                        return <CommentCard key={comment.article_id} comment={comment} />
                    })}
                </section>
            )}
        </>
    );
}
export default CommentList;