import { Spinner } from 'react-bootstrap';
import { useState } from "react"
import { useUserContext } from "../contexts/UserContext";
import { postComment } from "../utils/newsApi";

function PostComment({ articleId, comments, setComments }){
    const {user, setUser} = useUserContext();
    const [newComment, setNewComment] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        // prevent the form's default submission behaviour
        event.preventDefault();
        
        setDisabled(true)
        setLoading(true)
        setError(false)
        postComment(articleId, user.username, newComment)
        .then((commentFromApi) => {
            setComments([commentFromApi, ...comments]);
            setLoading(false);
            setNewComment(null);
            setDisabled(false);
        })
        .catch((errorFromApi) => {
            console.error(errorFromApi);
            setLoading(false);
            setError(true);
        })
    };

    return (
        <>
            {loading ? (
                <section className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" className="loading">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </section>
            ) : user ? (
                <section className="post-comment">
                    <h5>Post Comment</h5>
                    <form onSubmit={handleSubmit}>
                        <section className="mb-3">
                            <textarea
                                className='form-control'
                                placeholder='Post Comment'
                                rows="5"
                                value={newComment}
                                onChange={(event) => setNewComment(event.target.value)}
                                required
                            />
                        </section>
                        <button className="btn btn-primary float-end" type="submit" disabled={disabled}>
                            Submit
                        </button>
                    </form>
                </section>
            ) : (<></>)}
        </>
    );
}
export default PostComment;