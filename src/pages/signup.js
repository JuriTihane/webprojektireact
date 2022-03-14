import React, {useState} from 'react';

const SignUp = () => {

    // States for registration
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(false);
        setEmpty(false);
        setError(false);
        if (name === '' || password === '') {
            setEmpty(true);
        } else {
            await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({name, password})
            }).then(response => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        setError(true);
                        setMessage(data.message)
                    })
                } else {
                    setName('')
                    setPassword('')
                    setSubmitted(true);
                }
            })
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div className="success" style={{display: submitted ? '' : 'none',}}>
                <h1>User {name} successfully registered</h1>
            </div>
        );
    };

    // Showing empty message
    const emptyMessage = () => {
        return (
            <div className="empty" style={{display: empty ? '' : 'none',}}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div className="error" style={{display: error ? '' : 'none',}}>
                <h1>{message}</h1>
            </div>
        );
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Right',
                height: '100vh'
            }}
        >
            <div className='formWrapper'>
                <div className='pageTitle'>
                    <h1>Sign Up</h1>
                </div>

                {/* Calling to the methods */}
                <div className="messages pageTitle">
                    {emptyMessage()}
                    {errorMessage()}
                    {successMessage()}
                </div>

                <form className='signAndRegisterForm'>
                    {/* Labels and inputs for form data */}
                    <label className="label">Username</label>
                    <input onChange={handleName} className="input" value={name} type="text" />

                    <label className="label">Password</label>
                    <input onChange={handlePassword} className="input" value={password} type="password" />

                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
