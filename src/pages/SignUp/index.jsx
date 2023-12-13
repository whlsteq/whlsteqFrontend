import {useState} from 'react';

export function SignUp() {
    const[name, setname] =useState()
    const[surname, setSurname] =useState()
    const[password, setPassword] =useState()
    const[passwordRepeat, setPasswordRepeat] =useState()
    const[email, setEmail] =useState()


    const onSubmit =(event) => {axios.post('localhost:8080/api/v1/users/register')
    event.preventDefault();
    name,
    surname,
    email,
    password

    }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input type="textbox" name="name" id="name"onChange={(event)=>setname(event.target.value)}></input>
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input type="textbox" name="surname" id="surname"onChange={(event)=>setSurname(event.target.value)}></input>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"onChange={(event)=>setEmail(event.target.value)}></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"onChange={(event)=>setPassword(event.target.value)}></input>
      </div>
      <div>
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input type="password" name="passwordRepeat" id="passwordRepeat"onChange={(event)=>setPasswordRepeat(event.target.value)}></input>
      </div>
      <button disabled={!password || password !==passwordRepeat}>Sign Up</button>
    </form>
  );
}
