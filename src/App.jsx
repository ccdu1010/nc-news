import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import ArticlesList from './components/ArticlesList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:topic" element={<ArticlesList />} />
      </Routes>
    </Container>
  )
}

export default App
