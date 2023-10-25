import { useEffect } from "react"

const FetchBackend = () => {
  useEffect(() => {
    async function fetcho() {
      try {
        const res = await fetch("http://localhost:3000/api")
        const data = await res.json()
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetcho()

  }, [])
  return <h1>FetchBackend</h1>
}

export default FetchBackend