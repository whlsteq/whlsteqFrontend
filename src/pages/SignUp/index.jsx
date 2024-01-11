import { useState } from "react";
import { SignUpApi } from "./api";

export function SignUp() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [email, setEmail] = useState();
  const [apiProgression, setAPIProgression] = useState(false);
  const [errorMessage, setSerrorMessage] = useState();
  const [emailError, setEmailError] = useState(); // Email hata mesajını tutmak için

  const [errors, setErrors] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    setAPIProgression(true);

    try {
      const response = await SignUpApi({
        name,
        surname,
        password,
        email,
      });

      console.log("yanit", response);
      // if (response.validationErrors){
      //   console.log("validationErrors",response.validationErrors);
      // }
      setSerrorMessage(response);
    } catch (error) {
    } finally {
      setAPIProgression(false);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-5 offset-lg-3 col-sm-8 offset-sm-2">
        <form onSubmit={onSubmit} className="card">
          <div className="text-center card-header">
            <h1>Sign Up</h1>
          </div>

          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(event) => setName(event.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input
                type="text"
                name="surname"
                id="surname"
                onChange={(event) => setSurname(event.target.value)}
                className="form-control"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
              />
              {emailError && <div className="text-danger">{emailError}</div>}{" "}
              {/* Email hatası varsa göster */}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Password Repeat
              </label>
              <input
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                onChange={(event) => setPasswordRepeat(event.target.value)}
                className="form-control"
              ></input>
            </div>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {Object.entries(errorMessage).map(([key, value]) => (
                  <div key={key}>{value}</div>
                ))}
              </div>
            )}
            <div className="text-center">
              <button
                className="btn btn-dark"
                disabled={
                  apiProgression || !password || password !== passwordRepeat
                }
              >
                {apiProgression && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
