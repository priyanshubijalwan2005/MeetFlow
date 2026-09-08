import React from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>MeetFlow</h2>
        </div>

        <div className="navlist">
          <p onClick={() => navigate("/guest")}>Join as Guest</p>

          <p onClick={() => navigate("/auth")}>Register</p>

          <p onClick={() => navigate("/auth")}>Login</p>
        </div>
      </nav>

      <div className="landingMainContainer">
       
        <div className="landingContent">
          <h1>
            <span>Connect</span> with your loved ones
          </h1>

          <p>Cover a distance by our video call App</p>

          <div
            className="getStartedButton"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/auth")}
          >
            Get Started
          </div>
        </div>

        <div className="landingImage">
          <img src="/mobile.png" alt="Video Call App" />
        </div>
      </div>
    </div>
  );
}
