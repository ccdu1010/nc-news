import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { getUsers } from '../utils/newsApi';

function SignIn(){
    const [username, setUsername] = useState('');
    const {user, setUser} = useUserContext();
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // prevent the form's default submission behaviour
        event.preventDefault();

        setLoading(true)
        setError(false)
        getUsers()
        .then((usersFromApi) => {
            const userFromApi = usersFromApi.find(user => user.username === username);
            if(userFromApi) {
                setUser(userFromApi);
                navigate("/");
            }
            setLoading(false);
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
            ) : (
                <section className="sign-in">
                    <h5>Sign In</h5>
                    <form onSubmit={handleSubmit}>
                        <section className="mb-3">
                            <label>Username</label>
                            <input
                                className='form-control'
                                placeholder="Enter username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </section>

                        <section className="mb-3">
                            <label>Password</label>
                            <input 
                                className='form-control'
                                placeholder="Enter password" />
                        </section>
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </form>
                </section>
            )}
        </>
    );
}
export default SignIn;