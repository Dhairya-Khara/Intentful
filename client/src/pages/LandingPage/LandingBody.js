import React from "react";
import fakeMain from "./../Images/fakeMain.PNG";
import fakeFeature from "./../Images/fakeFeature.PNG";
// The above imports should be replace with the ones below
// once we have everything fleshed out and finalized:
// import mainImg from "./../Images/main.png"
// import visImg from "./../Images/vis.png"
// import vfImg from "./../Images/vf.png"

export default function LandingBody() {
  return (
    <div>
      <div>
        <img className="Mainimg" src={fakeMain} alt="Main Feature Gif"></img>
        {/* Replace with <img src={mainImg} alt="Main Feature Gif"></img> */}
        <div className="join">
          <div className="main-text">
            The easiest way to make chatbots <strong>quickly.</strong>
          </div>
          <button className="join-button">Join Today</button>
        </div>
      </div>
      <div className="LandingPage page">
        <div>
          <div className="create-text" id="feature">
            Create new chatbots for your<br></br> retail company at{" "}
            <strong>record pace.</strong>
          </div>
        </div>
        <div className="para left">
          <img className="para-img" src={fakeFeature} alt="Visualization"></img>
          {/* Replace with <img src={visImg} alt="Visualization"></img> */}
          <div className="para-with-subtext">
            <div className="subtext">
              <strong>Visualize your transcripts with ease</strong>
            </div>
            <div className="para-text">
              Our tool allows users to instantly determine the frequency of
              various intents that have occurred in either a a group of
              transcripts or a single transcript, and displays them in a
              beautiful bubble chart.
            </div>
          </div>
        </div>
        <div className="para right">
          <div className="para-with-subtext">
            <div className="subtext">
              <strong>Voiceflow integration to accelerate development</strong>
            </div>
            <div className="para-text">
              Instead of having to import each intent manually, our voiceflow
              integration allows users to create Voiceflow intent blocks with
              the click of a button, improving development times by upwards of
              30%!
            </div>
          </div>
          <img
            src={fakeFeature}
            className="para-img"
            alt="Voiceflow Integration"
          ></img>
          {/* Replace with <img src={vfImg} alt="Voiceflow Integration"></img> */}
        </div>
        <div>
          <div className="final-join">
            <div className="final-join-text">
              Voiceflow is an amazing tool. Let us help you unlock <br></br>
              its full potential and make the best of your chatbots.
            </div>
            <div className = "buttons">
              <div className="registerbtn">
                <div className="register-button">Join Today</div>
              </div>
              <div className="loginbtn">
                <div className="login-button">Login</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
