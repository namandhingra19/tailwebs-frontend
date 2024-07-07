import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { Header } from "../components/Header";
import StudentList from "../components/StudentList";

export function Teacherpage() {
  const [user, setUser] = useState<any>(null);
  function fetchuserDetails() {
    getUser()
      .then((x) => {
        setUser(x);
      })
      .catch((e) => {
        window.location.href = "/login";
      });
  }
  useEffect(() => {
    fetchuserDetails();
  }, []);
  if (user) {
    return (
      <div>
        <Header />
        <StudentList />
      </div>
    );
  } else {
    return <></>;
  }
}
