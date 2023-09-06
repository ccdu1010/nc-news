import { Container, Col, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";

function ArticleCard({article}){
    return (
        <Col key={article.article_id} className="article">
            <Link to={`articles/${article.article_id}`}>
                <img src={article.article_img_url} />
                <Container>
                    <Badge bg="secondary">{article.topic}</Badge>
                    <h2>{article.title}</h2>
                </Container>
            </Link>
        </Col>
    );
}
export default ArticleCard;