import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(
      `https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
    const data = await response.json()
    dispatch({
      type: "GET_USERS",
      payload: data,
    })
  }

  // SET_LOADING
  const setLoading = () => dispatch({ type: "SET_LOADING" })

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
