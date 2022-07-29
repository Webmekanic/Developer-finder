import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async () => {
    const response = await fetch(
      `https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
    const data = await response.json()
    dispatch({
      type: "GET_USERS",
      payload: data,
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
