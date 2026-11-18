import React, { useState, useEffect } from "react";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error fetching toys:", err));
  }, []);

  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }

  function handleDeleteToy(idToDelete) {
    const updatedToys = toys.filter((toy) => toy.id !== idToDelete);
    setToys(updatedToys);
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <ToyContainer 
        toys={toys} 
        onUpdateToy={handleUpdateToy} 
        onDeleteToy={handleDeleteToy} 
      />
    </>
  );
}

export default App;