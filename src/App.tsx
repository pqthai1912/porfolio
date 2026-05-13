import React, { useEffect } from "react";
import PortfolioDashboard from "./components/PortfolioDashboard";
import { env } from "./utils/env";
import "./App.css";

const App: React.FC = () => {
  useEffect(() => {
    const imagesToPreload = [
      "/background.jpeg",
      "/avatar.jpg",
      "/carousel_1.JPEG",
      "/carousel_2.JPEG",
      "/carousel_3.JPEG",
    ];

    imagesToPreload.forEach((imagePath) => {
      const img = new Image();
      img.src = env.PUBLIC_URL + imagePath;
    });
  }, []);

  return (
    <div className="app loaded dashboard-app">
      <PortfolioDashboard />
    </div>
  );
};

export default App;
