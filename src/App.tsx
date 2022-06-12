import React from "react";
import logo from "./logo.svg";
import { Carousels } from "./components/carousels/Carousels";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Carousels
        images={[
          "/images/1.jpg",
          "/images/2.jpg",
          "/images/3.jpg",
          "/images/4.jpg",
          "/images/5.jpg",
        ]}
        imageWidth={200}
        imageHeight={250}
      />
    </div>
  );
}

export default App;
