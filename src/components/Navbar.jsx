"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-dvh overflow-x-hidden">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-red-700 text-white p-6 z-50 transform transition-transform duration-200 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <Link href={"/"} onClick={() => setOpen(false)}>
            <h2 className="text-2xl font-bold">Stock app</h2>
          </Link>
          <nav className="flex flex-col justify-center">
            <div className="flex flex-col gap-2">
              <Link
                href={"/producto"}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                <span>Agregar producto</span>
              </Link>
              <Link
                href={"/stock"}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v18"></path>
                  <path d="M19 21H5"></path>
                  <path d="M3 9h4l2 2h4l2-2h4"></path>
                  <path d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"></path>
                </svg>
                <span>Stock</span>
              </Link>
              <Link
                href={"/venta"}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13m-11 0a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                <span>Generar venta</span>
              </Link>
              <Link
                href={"/ventastotales"}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>Ventas totales</span>
              </Link>
              <Link
                href={"/estadisticas"}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
                <span>Estadisticas</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 top-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 w-screen md:pl-64 shadow-md">
        <header className="bg-red-700 shadow-md p-4 fixed w-full md:hidden flex justify-between items-center">
          <button onClick={() => setOpen(true)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        <main className="w-full min-h-[100dvh] flex-1 flex flex-col items-center justify-center bg-neutral-300">
          {children}
        </main>
      </div>
    </div>
  );
}
