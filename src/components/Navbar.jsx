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
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#fff"
                    d="M12 6v-6h-8v6h-4v7h16v-7h-4zM7 12h-6v-5h2v1h2v-1h2v5zM5 6v-5h2v1h2v-1h2v5h-6zM15 12h-6v-5h2v1h2v-1h2v5z"
                  ></path>
                  <path fill="#fff" d="M0 16h3v-1h10v1h3v-2h-16v2z"></path>
                </svg>
                <span>Stock</span>
              </Link>
              <Link
                href={"/cargarpedido"}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#fff"
                    d="M317.056 128L128 344.064V896h768V344.064L706.944 128H317.056zm-14.528-64h418.944a32 32 0 0124.064 10.88l206.528 236.096A32 32 0 01960 332.032V928a32 32 0 01-32 32H96a32 32 0 01-32-32V332.032a32 32 0 017.936-21.12L278.4 75.008A32 32 0 01302.528 64z"
                  />
                  <path fill="#fff" d="M64 320h896v64H64z" />
                  <path
                    fill="#fff"
                    d="M448 327.872V640h128V327.872L526.08 128h-28.16L448 327.872zM448 64h128l64 256v352a32 32 0 01-32 32H416a32 32 0 01-32-32V320l64-256z"
                  />
                </svg>
                <span>Cargar pedido</span>
              </Link>
              <Link
                href={"/pedidos"}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 p-2 rounded flex gap-3 items-center"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 0.6 0.6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.33 0.03a0.03 0.03 0 1 0 -0.06 0v0.228L0.231 0.219a0.03 0.03 0 0 0 -0.042 0.042l0.09 0.09a0.03 0.03 0 0 0 0.042 0l0.09 -0.09a0.03 0.03 0 0 0 -0.042 -0.042L0.33 0.258z"
                    fill="#fff"
                  />
                  <path
                    d="M0.09 0.42V0.09h0.12V0.03H0.075A0.045 0.045 0 0 0 0.03 0.075v0.45A0.045 0.045 0 0 0 0.075 0.57h0.45a0.045 0.045 0 0 0 0.045 -0.045v-0.45A0.045 0.045 0 0 0 0.525 0.03H0.39v0.06h0.12v0.33h-0.105c-0.023 0 -0.042 0.02 -0.058 0.037l-0.003 0.004A0.06 0.06 0 0 1 0.3 0.48a0.06 0.06 0 0 1 -0.044 -0.019l-0.003 -0.004C0.237 0.44 0.218 0.42 0.195 0.42z"
                    fill="#fff"
                  />
                </svg>
                <span>Pedidos</span>
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
