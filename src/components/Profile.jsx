export default function Profile({ email, onClickLogOut }) {
  if (!email) return <p>No user email available.</p>;

  return (
    <div className="max-w-md mx-auto p-6 rounded text-center">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <p className="text-white my-2">{email}</p>
      <button
        className="w-full bg-white text-black py-2 my-2 rounded hover:bg-gray-400 transition"
        onClick={onClickLogOut}
      >
        Cerrar sesion
      </button>
    </div>
  );
}
