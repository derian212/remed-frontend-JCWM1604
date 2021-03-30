import axios from "axios";
import { API_URL } from "../../helper";

export const LoginAction = (input) => {
  return {
    type: "LOGIN",
    payload: input,
  };
};

export const CartAction = (input) => {
  return {
    type: "ADDCART",
    cart: input,
  };
}

export const LoginActionThunk = (input) => {
  var { username, password } = input;
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`${API_URL}/users?username=${username}&password=${password}`)
      .then((res) => {
        if (res.data.length) {
          localStorage.setItem("id", res.data[0].id);
          dispatch({ type: "LOGIN", payload: res.data[0] });
        } else {
          dispatch({ type: "ERROR", error: "user tidak ditemukan" });
        }
      })
      .catch((err) => {
        dispatch({ type: "ERROR", error: "server error" });
      });
  };
};

export const RegActionThunk = (input) => {
  return (dispatch) => {
    var { username, password, confirmpassword } = input;
    let data = {
      username,
      password,
      role: 'users',
    };
    if (password === confirmpassword) {
      axios
        .get(`${API_URL}/users?username=${username}`)
        .then((res1) => {
          console.log(data.username)
          console.log(res1.data.length)
          if (res1.data.length) {
            dispatch({ type: "ERROR", error: "username telah terdaftar" })
          } else {
            axios
              .post(`${API_URL}/users`, data)
              .then((res2) => {
                localStorage.setItem("id", res2.data.id);
                dispatch({ type: "LOGIN", payload: res2.data });
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      dispatch({ type: "ERROR", error: "confirm dan pass harus sama" });
    }
  }
}

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
}

export const ResetAction = () => {
  return {
    type: "RESET",
  };
};
export const ResetActionthunk = () => {
  return (dispatch) => {
    dispatch({ type: "RESET" });
  };
};