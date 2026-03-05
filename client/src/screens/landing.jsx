import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    return (
        <>
            <h2>Landing</h2>
            <button onClick={() => navigate('/register')}>Get Started</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </>)
}
export default Landing;