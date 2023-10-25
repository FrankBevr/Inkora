import { useEffect } from "react"
import axios from "axios";

const FetchBackend = () => {
  useEffect(() => {
    async function fetcho() {
      fetch("http://localhost:3000/api", { mode: "no-cors" }).then((res) => {
        res.json().then(data => { console.log(data) })
      })
    }
    fetcho()

  }, [])
  return <h1>FetchBackend</h1>
}

export default FetchBackend
