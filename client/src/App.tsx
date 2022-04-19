import { useState } from "react";

const btnClasses =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

function App() {
  const createGroup = async (e: any) => {
    e.preventDefault();
    const p1 = {
      name: e.target["name-1"].value,
      number: e.target["phone-1"].value,
    };
    const p2 = {
      name: e.target["name-2"].value,
      number: e.target["phone-2"].value,
    };

    const resp = await fetch("http://localhost:3001/create-group/", {
      method: "POST",
      body: JSON.stringify({
        people: [p1, p2],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.ok) {
      alert("Created Group!");
    } else {
      alert("Error! WhatsApp not ready");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <div className="flex flex-col gap-4 border border-black rounded p-4">
        <h1 className="text-6xl text-center">🤝</h1>
        <h1 className="text-2xl text-center mb-4">Pul- WhatsApp Intro Bot</h1>
        <form className="flex flex-col gap-2" onSubmit={createGroup}>
          <div className="flex gap-2">
            <input
              className="border p-1 rounded"
              placeholder="Name 1"
              name="name-1"
            />
            <input
              className="border p-1 rounded"
              placeholder="Phone Number"
              name="phone-1"
            />
          </div>
          <div className="flex gap-2">
            <input
              className="border p-1 rounded"
              placeholder="Name 2"
              name="name-2"
            />
            <input
              className="border p-1 rounded"
              placeholder="Phone Number"
              name="phone-2"
            />
          </div>
          <button className={btnClasses} type="submit">
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
