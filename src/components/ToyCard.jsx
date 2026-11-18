import React from "react";

function ToyCard({ toy, onUpdateToy, onDeleteToy }) {
  const { id, name, image, likes } = toy;

  function handleLike() {
    const updateObj = {
      likes: likes + 1,
    };

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        onUpdateToy(updatedToy);
      });
  }

  function handleDonate() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        onDeleteToy(id); 
      });
  }

  return (
   
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      {/* FIXED: Capital W in GoodWill */}
      <button className="del-btn" onClick={handleDonate}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;