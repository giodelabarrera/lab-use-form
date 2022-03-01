import { useState } from "react";
import "./styles.css";

function useForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  };
}

const initialValues = {
  username: "pepe",
  accepted: false,
  role: "guest"
};

export default function App() {
  const { values, touched, errors, handleChange, handleBlur } = useForm({
    initialValues,
    onSubmit: () => {}
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <hr />
      <form>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
        </div>
        <div>
          <label>Accept</label>
          <input
            name="accepted"
            type="checkbox"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.accepted}
          />
        </div>
        <div>
          <label>Role</label>
          <select
            name="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
          >
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
      <hr />
      <pre>{JSON.stringify({ values, touched, errors }, null, 2)}</pre>
    </div>
  );
}
