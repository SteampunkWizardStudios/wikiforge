"use client";

import { useState, useEffect } from "react";
import { FavoriteColor } from "@prisma/client";

export default function ColorsPage() {
  const [colors, setColors] = useState<FavoriteColor[]>([]);
  const [newColor, setNewColor] = useState("");

  useEffect(() => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then((data) => setColors(data));
  }, []);

  const addColor = async () => {
    const res = await fetch("/api/colors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: newColor }),
    });
    const data = await res.json();
    setColors([...colors, data]);
    setNewColor("");
  };

  const removeColor = async (id: number) => {
    await fetch("/api/colors", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setColors(colors.filter((color) => color.id !== id));
  };

  return (
    <div>
      <h1>Colors</h1>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            {color.color}{" "}
            <button
              className="text-red-500"
              onClick={() => removeColor(color.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newColor}
        onChange={(e) => setNewColor(e.target.value)}
        placeholder="Add a new color"
        className="text-black"
      />
      <button onClick={addColor}>Add Color</button>
    </div>
  );
}
