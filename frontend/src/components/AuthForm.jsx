import { Link } from "react-router-dom";

const AuthForm = ({
  title,
  buttonText,
  fields,
  formData,
  handleChange,
  handleSubmit,
  footerText,
  footerLink,
  footerLinkText,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">{title}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          ))}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            {buttonText}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="font-medium text-blue-600 hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
