import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase-client";
import {
  LoginSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({ email: "", password: "" });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = LoginSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      console.log("Dati form validi, tentativo di login:", data);
      let { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (signInError) {
        alert("Errore durante il login: " + signInError.message);
        console.error("Errore Supabase Login:", signInError);
      } else {
        alert("Accesso effettuato con successo! 👍🏻");
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({
      ...prev,
      [property]: message,
    }));
    setTouchedFields((prev) => ({
      ...prev,
      [property]: true,
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
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-header text-center bg-warning text-dark opacity-70  text-light">
            <div className="card-header text-center ">
              <h1>Accedi</h1>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={setField("email")}
                    onBlur={onBlur("email")}
                    className={`form-control ${
                      isInvalid("email")
                        ? "is-invalid"
                        : isInvalid("email") === false
                        ? "is-valid"
                        : ""
                    }`}
                    required
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                  {isInvalid("email") === false &&
                    !formErrors.email &&
                    formState.email && (
                      <div className="valid-feedback">Sembra valido!</div>
                    )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={setField("password")}
                    onBlur={onBlur("password")}
                    className={`form-control ${
                      isInvalid("password")
                        ? "is-invalid"
                        : isInvalid("password") === false
                        ? "is-valid"
                        : ""
                    }`}
                    required
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback">
                      {formErrors.password}
                    </div>
                  )}
                  {isInvalid("password") === false &&
                    !formErrors.password &&
                    formState.password && (
                      <div className="valid-feedback">Sembra valido!</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}