import { Badge } from 'react-bootstrap';

function CommentCard({comment}){
    return (
        <section key={comment.comment_id} className="comment">
            <span className="author"><Badge className='rounded-pill bg-secondary'>{comment.author.charAt(0).toUpperCase()}</Badge> {comment.author}</span>
            <time className="datetime">{new Date(comment.created_at).toDateString()}</time>
            <main>{comment.body}</main>
            <Badge>Votes: {comment.votes}</Badge>
        </section>
    );
}
export default CommentCard;