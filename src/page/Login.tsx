import { useState } from "react";



function Login() {
    const [Account, setAccount] = useState('')
    const [Password, setPwd] = useState('')

    function login() {
        fetch(`api/User/Login`, {
            method: 'post',
            body: JSON.stringify({Account: Account, Password: Password}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then((res)=>{
        })
    }

    return (
        <div>
            <div className="flex_center">
                <label>Account:</label> <input onChange={(e)=>{setAccount(e.target.value)}}/>
            </div>
            <div className="flex_center">
                <label>Password:</label> <input onChange={(e)=>{setPwd(e.target.value)}} />
            </div>
            <div className="flex_center">
                <button onClick={login}>login</button>
            </div>
        </div>
    )
}

export default Login;