"use client";

import { useForm } from "react-hook-form";

export default function Login({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md min-w-xs md:min-w-sm mx-auto p-6 border bg-red-700 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full border px-3 py-2 rounded"
          autoComplete="on"
        />
        {errors.email && (
          <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm w-full text-center inline-block mt-2">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "At least 6 characters required",
            },
          })}
          className="w-full border px-3 py-2 rounded"
          autoComplete="on"
        />
        {errors.password && (
          <p className="text-red-700 bg-red-200 rounded px-2 py-1 text-sm w-full text-center inline-block mt-2">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-400 transition"
      >
        {loading ? "Iniciando sesión" : "Inicia sesión"}
      </button>
    </form>
  );
}
