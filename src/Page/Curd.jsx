import { useEffect, useState } from "react";
import axios from "axios";

export default function Curd() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("https://react-interview.crd4lc.easypanel.host/api/login")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(data);
  return <div></div>;
}
