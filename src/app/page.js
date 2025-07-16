"use client";
import Container from "@/components/Container";
import Login from "@/components/Login";
import Profile from "@/components/Profile";
import useAuth from "@/hooks/useAuth";
import useStore from "@/store/useStore";

export default function Home() {
  const { Login: useLogin, Logout, loading, error } = useAuth();
  const user = useStore((state) => state.user);

  return (
    <Container>
      {user ? (
        <Profile email={user.email} onClickLogOut={Logout} />
      ) : (
        <Login onSubmit={useLogin} loading={loading} error={error} />
      )}
    </Container>
  );
}
