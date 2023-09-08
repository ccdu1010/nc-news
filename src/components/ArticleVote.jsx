import { Badge } from 'react-bootstrap';
import { HandThumbsDownFill, HandThumbsUp } from 'react-bootstrap-icons';
import { patchArticle } from "../utils/newsApi";

1
function ArticleVote({articleId, votes, setVotes}){
    const incVotes = (inc) => {
        setVotes(votes + inc);
        patchArticle(articleId, inc)
        .then((articleFromApi) => {
            console.log("vote success")
            console.log(votes)
            setVotes(articleFromApi.votes);
        })
        .catch((errorFromApi) => {
            console.error(errorFromApi);
            setVotes(votes);
        })
    }

    return (
        <section className="vote">
            <a href='#' onClick={() => incVotes(-1)}><HandThumbsDownFill /></a>
            <Badge className='bg-dark'>{votes}</Badge>
            <a href='#' onClick={() => incVotes(1)}><HandThumbsUp /></a>
        </section>
    );
}
export default ArticleVote;