import { useExampleStore } from "./../../store/store";
import { useState } from "react";

const ViewStore = () => {
  const data = useExampleStore((store) => store.data);
  const addData = useExampleStore((store) => store.addData);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [food, setFood] = useState("");

  const handleSubmit = () => {
    addData(name, Number(age), food);
    setName("");
    setAge("");
    setFood("");
  };
  return (
    <>
      <h1>ViewStore</h1>
      {data.map((item, index) => (
        <div key={index}>
          <p>Thats my name: {item.name}</p>
          <p>Thats my age: {item.age}</p>
          <p>Thats my favorite food: {item.food}</p>
          <hr></hr>
        </div>
      ))}
      <h2>Add Data to Store (hardcoded)</h2>
      <p>Add </p>
      <code>&#123; name: Herbert, age: 30, food: "chicken" &#125;</code>
      <p>to store</p>
      <button
        onClick={() => {
          addData("Herbert", 30, "chicken");
        }}
      >
        Submit
      </button>
      <h2>Add Data to Store (via input)</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <input
        type="text"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Favorite Food"
      />
      <button onClick={handleSubmit}>Submit</button>
      <h2>Update Data to Store</h2>
      <h2>Delete Data to Store</h2>
    </>
  );
};

export default ViewStore;
