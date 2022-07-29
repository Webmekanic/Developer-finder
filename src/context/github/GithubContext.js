import { createContext, useState } from "react"

const GithubContext = createContext()

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const response = await fetch(
      `https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
