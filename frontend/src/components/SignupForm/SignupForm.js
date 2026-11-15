import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const today = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 119 }, (_, i) => today.getFullYear() - i);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDate, setBirthDate] = useState(1);
  const [birthYear, setBirthYear] = useState(2000);
  const [gender, setGender] = useState("");
  const [showCustomGenderForm, setShowCustomGenderForm] = useState(false);

  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.signup({
        firstName,
        lastName,
        email,
        password,
        birthday: `${birthYear}-${birthMonth < 10 ? 0 : ""}${birthMonth}-${
          birthDate < 10 ? 0 : ""
        }${birthDate}`,
        gender,
      })
    ).catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if, e.g., server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  const errorMessages = () => {
    if (errors.length) {
      return (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="signupContainer">
      <div className="signupHeaderContainer">
        <h1>Sign Up</h1>
        <h2>It's quick and easy.</h2>
      </div>

      <div className="signupFormContainer">
        <form id="signup" onSubmit={handleSubmit}>
          {errorMessages()}

          <div className="nameContainer">
            <div className="firstNameContainer">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
              />
            </div>
            <div className="lastNameContainer">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="newEmailContainer">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="newPasswordContainer">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
            />
          </div>
          <label>Birthday</label>
          <div className="birthdayContainer">
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
            >
              {months.map((month, i) => (
                <option value={`${i + 1}`}>{month}</option>
              ))}
            </select>
            <select
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            >
              {days.map((day) => (
                <option value={`${day}`}>{day}</option>
              ))}
            </select>
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            >
              {years.map((year) => (
                <option value={`${year}`}>{year}</option>
              ))}
            </select>
          </div>

          <label>Gender</label>
          <div className="genderContainer">
            <label>
              Female
              <input
                type="radio"
                name="gender"
                value="female"
                onClick={(e) => {
                  setGender(e.target.value);
                  setShowCustomGenderForm(false);
                }}
                required
              />
            </label>
            <label>
              Male
              <input
                type="radio"
                name="gender"
                value="male"
                onClick={(e) => {
                  setGender(e.target.value);
                  setShowCustomGenderForm(false);
                }}
                required
              />
            </label>
            <label>
              Custom
              <input
                type="radio"
                name="gender"
                value="custom"
                onClick={(e) => {
                  setGender("");
                  setShowCustomGenderForm(true);
                }}
                required
              />
            </label>
          </div>

          {showCustomGenderForm && (
            <>
              <div className="customGenderFormContainer">
                <select onChange={(e) => setGender(e.target.value)}>
                  <option value="" disabled selected>
                    Select your pronoun
                  </option>
                  <option value="She">She: "Wish her a happy birthday!</option>
                  <option value="He">He: "Wish him a happy birthday!</option>
                  <option value="They">
                    They: "Wish them a happy birthday!
                  </option>
                </select>

                <label className="customGenderLabel">
                  Your pronoun is visible to everyone.
                </label>
                <input
                  className="genderTextBox"
                  type="text"
                  placeholder="Gender (optional)"
                ></input>
              </div>
            </>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
