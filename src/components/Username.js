import {useState} from 'react'

function Username() {
    const [username, setUsername] = useState('');

    const handleUsername = () =>{
        if(username !== ""){
            localStorage.setItem("username", username);
            window.location.href = '/';
        }
    }

    return (
    <div className='user-container'>
        <h2>Type your username for enter the app</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
        <button onClick={handleUsername}>Enter</button>
    </div>
    )
}

export default Username
