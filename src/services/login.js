import axios from "axios";
const baseUrl = "/api/login"

const loginUser = async(username, password) => {
  const login = await axios
    .post(baseUrl, { username, password })

  return login.data
}

export { loginUser }