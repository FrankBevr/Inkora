import { useExampleStore } from "./../../store/store";

const ViewStore = () => {
  const [rambledData] = useExampleStore((store) => store.rambledData);
  console.log(rambledData.name)
  return (
    <>
      <h1>ViewStore</h1>
      <h2>Get Data from Store</h2>
      <p>Thats my name: {rambledData.name}</p>
      <p>Thats my age: {rambledData.age}</p>
      <p>Thats my favorite food: {rambledData.food}</p>
      <h2>Add Data to Store</h2>
      <h2>Update Data to Store</h2>
      <h2>Delete Data to Store</h2>
    </>
  )
}

export default ViewStore
