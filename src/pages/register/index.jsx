import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmSchema, getErrors, getFieldError } from '../../lib/validationForm';
import supabase from '../../supabase/supabase-client';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    focused: "",
    username: "",
    password: ""
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username
          }
        }
      });
      if (signUpError) {
        console.error("Errore di registrazione Supabase:", signUpError.message);
        alert("Errore durante la registrazione. Riprova. 👎🏻!");
      } else {
        alert("Registrazione avvenuta con successo! 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({
      ...prev,
      [property]: message
    }));
    setTouchedFields((prev) => ({
      ...prev,
      [property]: true
    }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card  bg-warning text-dark opacity-83 text-light">
            <div className="card-header text-center ">
              <h1>Registrati</h1>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={setField("email")}
                    onBlur={onBlur("email")}
                    className={`form-control ${isInvalid("email") ? 'is-invalid' : isInvalid("email") === false ? 'is-valid' : ''}`}
                    required
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Nome:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={setField("firstName")}
                    onBlur={onBlur("firstName")}
                    className={`form-control ${isInvalid("firstName") ? 'is-invalid' : isInvalid("firstName") === false ? 'is-valid' : ''}`}
                    required
                  />
                  {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Cognome:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={setField("lastName")}
                    onBlur={onBlur("lastName")}
                    className={`form-control ${isInvalid("lastName") ? 'is-invalid' : isInvalid("lastName") === false ? 'is-valid' : ''}`}
                    required
                  />
                  {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={setField("username")}
                    onBlur={onBlur("username")}
                    className={`form-control ${isInvalid("username") ? 'is-invalid' : isInvalid("username") === false ? 'is-valid' : ''}`}
                    required
                  />
                  {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={setField("password")}
                    onBlur={onBlur("password")}
                    className={`form-control ${isInvalid("password") ? 'is-invalid' : isInvalid("password") === false ? 'is-valid' : ''}`}
                    required
                  />
                  {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}