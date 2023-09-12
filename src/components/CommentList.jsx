import CommentCard from './CommentCard';

function CommentList({ comments }){
    return (
        <section className="comments-view">
            <h5>All Comments</h5>
            {comments.map((comment) => {
                return <CommentCard key={comment.comment_id} comment={comment} />
            })}
        </section>
    );
}
export default CommentList;