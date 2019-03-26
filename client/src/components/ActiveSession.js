import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import StudentInfo from "./StudentInfo";
import SurveyLink from "./SurveyLink";
import ADPNotes from "./ADPNotes";
import Countdown from "./Countdown";
import TutorForm from "./TutorForm";
import SessionTitle from "./SessionTitle";
import SessionEnd from "./SessionEnd";

class ActiveSession extends Component {
  state = {
    timer: 60,
    show: false
  };

  componentDidMount() {
    this.handleCountdown();
  }

  handleCountdown = () => {
    const timer = setInterval(() => {
      if (this.state.timer === 1) {
        clearInterval(timer);
      }
      this.setState({ timer: this.state.timer - 1 });
    }, 60);
  };

  modalToggle = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const {
      classCode,
      name,
      email,
      github,
      zoomLink,
      prevNotes,
      b2b,
      showNoShow,
      topics,
      sessionDate
    } = this.props.studentData;
    return (
      <div className="container-flex" style={{ margin: "1.5rem auto" }}>
        {this.state.show && (
          <SessionEnd
            show={this.state.show}
            modalToggle={this.modalToggle}
            handleEndSession={this.props.handleEndSession}
          />
        )}
        <Countdown timer={this.state.timer} />
        <Card style={{ width: "95vw", margin: "0 auto" }}>
          <Card.Body className="cards-wrapper">
            <SessionTitle link={zoomLink} name={name} />
            {this.state.timer === 0 && (
              <Button
                variant="secondary"
                id="end-btn"
                onClick={this.modalToggle}
              >
                End Session
              </Button>
            )}
            <div
              className="card-main"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <StudentInfo
                name={name}
                link={zoomLink}
                notes={prevNotes}
                topics={topics}
              />
              <ADPNotes
                code={classCode}
                name={name}
                b2b={b2b}
                showNoShow={showNoShow}
              />
              <SurveyLink code={classCode} />
            </div>
          </Card.Body>
        </Card>
        <TutorForm
          code={classCode}
          name={name}
          email={email}
          github={github}
          date={sessionDate}
        />
      </div>
    );
  }
}
export default ActiveSession;
