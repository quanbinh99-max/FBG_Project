import React, { useEffect, useState } from "react";
import Admin from "../../Components/Admin/index";
import apiClient from "../../util/http-common";
import { useRouter } from "next/router";

function Index(props) {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  console.log(router.query.key);
  useEffect(() => {
    const secretKey = async () => {
      try {
        const response = await apiClient.post("/key", {
          key: router.query.key,
        });
        if (response.status === 200) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    secretKey();
  }, []);

  return (
    <div>
      {login === true ? <Admin></Admin> : <h1>Bạn không phải Admin</h1>}
    </div>
  );
}

export default Index;
