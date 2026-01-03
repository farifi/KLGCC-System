import { use, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import bgImage from '../assets/golfBG.jpg';
import logo from '../assets/logo_klgcc_black.png';

import "./Pages CSS files/Login.css";

const Login = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('login')

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError('')

        if (!username || !password) {
            setError('Please fill in all fields');            
            return;
        }
        
        try {
            if (activeTab === 'login'){
                await login(username, password);
            } else {
                await register(username, email, password);
            }

            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || `${activeTab === 'login' ? 'Login' : 'Sign up' } failed. Please try again.`);      
        }
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: 'fixed' }}>
            <div className="login-card">
                <div className="glass-highlight" />
                <div className="login-logo-box">
                    <img src={logo} alt="Kuala Lumpur Golf & Country Club Logo" />
                </div>

                <h2 className="club-title">KLGCC</h2>
                <p className="club-subtitle">Kuala Lumpur Golf & Country Club</p>

                <div className="tab-buttons">
                    <button className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Log in</button>
                    <button className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign up</button>
                </div>
                
                <form className={`login-form ${activeTab}-form`} onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                    {activeTab === 'signup' && (
                        <>
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm your password" />
                        </>
                    )}
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="login-btn">
                        {activeTab === 'login' ? 'Log in' : 'Sign up'}
                        </button>
                </form>
            </div>
            
        </div>
    );
};

export default Login;