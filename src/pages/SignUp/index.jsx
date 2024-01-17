import { useEffect, useState } from "react";
import { SignUpApi } from "./api";
import { Input } from "./components/Input";

export function SignUp() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [email, setEmail] = useState();
  const [apiProgression, setAPIProgression] = useState(false);
  const [errorMessage, seterrorMessage] = useState();
  const [nameErrorMessage, setNameErrorMessage] = useState();
  const [surnameErrorMessage, setSurnameErrorMessage] = useState();
  const [emailErrorMessage, setEmailErrorMessage] = useState();
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();
  const [generalErrorMessage, setGeneralErrorMessage] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    setAPIProgression(true);
    seterrorMessage();
    setNameErrorMessage();
    setSurnameErrorMessage();
    setEmailErrorMessage();
    setPasswordErrorMessage();
    setGeneralErrorMessage();

    // useEffect(() => {
    //   seterrorMessage(function (lastErrors) {
    //     return {
    //       ...lastErrors,
    //       name: undefined
    //     }
    //   });
    // },[name]); hata dan sonra name textbox a yazi yazilinca hata olan yeri kaldiriyor.


    // useEffect(() => {
    //   seterrorMessage(function (lastErrors) {
    //     return {
    //       ...lastErrors,
    //       email: undefined
    //     }
    //   });
    // },[email]); hata dan sonra email textbox a yazi yazilinca hata olan yeri kaldiriyor.

    try {
      const response = await SignUpApi({
        name,
        surname,
        password,
        email,
      });

      // console.log("yanit", response);
      // if (response.validationErrors){
      //   console.log("validationErrors",response.validationErrors);
      // }
      seterrorMessage(response);
      setNameErrorMessage(response.name);
      setSurnameErrorMessage(response.surname);
      setEmailErrorMessage(response.email);
      setPasswordErrorMessage(response.password);
    } catch (error) {
      if (error.response?.data.name === "BusinessException") {
        // console.log("error", error.response);
        setEmailErrorMessage(error.response.data.message);
      } else {
        setGeneralErrorMessage("Unexpected error occured. Please try again.");
      }
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
            <Input
              id="name"
              label="Name"
              inputType="text"
              error={nameErrorMessage}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              id="surname"
              label="Surname"
              inputType="text"
              error={surnameErrorMessage}
              onChange={(event) => setSurname(event.target.value)}
            />
            <Input
              id="email"
              label="E-mail"
              inputType="email"
              error={emailErrorMessage}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              id="password"
              label="Password"
              inputType="password"
              error={passwordErrorMessage}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Input
              id="passwordRepeat"
              label="Password Repeat"
              inputType="password"
              error={passwordErrorMessage}
              onChange={(event) => setPasswordRepeat(event.target.value)}
            />

            {/* <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(event) => setName(event.target.value)}
                className={
                  nameErrorMessage ? "form-control is-invalid" : "form-control"
                }
              />
              <div className="invalid-feedback">{nameErrorMessage}</div>
            </div> */}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {Object.entries(errorMessage).map(([key, value]) => (
                  <div key={key}>{value}</div>
                ))}
              </div>
            )}

            {emailErrorMessage && !errorMessage && (
              <div className="alert alert-danger" role="alert">
                {emailErrorMessage}
              </div>
            )}
            {generalErrorMessage && (
              <div className="alert alert-danger" role="alert">
                {generalErrorMessage}
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
