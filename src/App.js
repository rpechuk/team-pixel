import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, Table, Form, FormControl, Button, Offcanvas, Container } from "react-bootstrap";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import 'bootstrap/dist/css/bootstrap.min.css';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

library.add(faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height: 15,
      width: 15,
      background: '#fff',
      cellColor: '#f44336',
      mouseDown: false,
      menuVisible: true

    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const canvas = document.querySelector("#pixel_canvas");
    canvas.innerHTML = '';
    this.setState({ background: '#fff'});

    for (let x = 0; x < 10; x++) {
      let row = document.createElement("tr");
      canvas.appendChild(row);

      for (let y = 0; y < 10; y++) {
        let cell = document.createElement("td");
        row.appendChild(cell);
      }
    }
  }

  // going to allow you to change the color
  handleSubmit = (event) => {
    event.preventDefault();
  }

  // Cell color
  handleCellColor = (color) => {
    this.setState({ cellColor: color.hex });
  }

  handleCellColorOnClick = (event) => {
    event.target.style.backgroundColor = this.state.cellColor;
    this.setState({ mouseDown: true });
  }

  handleMouseState = () => {
    this.setState({ mouseDown: false });
  }

  // Table background color
  handleBackgroundColor = (color) => {
    this.setState({ background: color.hex });
  };

  // Remove color
  handleColorRemove = (event) => {
    event.target.style.backgroundColor = '';
  }

  mobileMenu = () => {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
  }

  // TODO: Separate into single components

  render() {
    return (
      <div className="App">
      <Navbar bg="dark" variant="dark" expand={false}>
      <Container fluid>
          <Navbar.Brand href="#">Team Pixel</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Join Project</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="ID"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-dark">Join</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
      </Container>
      </Navbar>

        <div className="App-Content">
          <div className={this.state.menuVisible ? "Canvas" : "Canvas full-width"}>
              <h1>Design Canvas</h1>
              <table
                id="pixel_canvas"
                className="pixel_canvas"
                style={{backgroundColor: this.state.background}}
                onMouseDown={this.handleCellColorOnClick} // changes the color of the thing
                onMouseMove={this.state.mouseDown ? this.handleCellColorOnClick : null}
                onMouseUp={this.handleMouseState}
                onMouseLeave={this.handleMouseState}
                onTouchStart={this.handleCellColorOnClick}
                onTouchMove={this.state.mouseDown ? this.handleCellColorOnClick : null}
                onTouchEnd={this.handleMouseState}
                onDoubleClick={this.handleColorRemove}>
              </table>
          </div>
          <div className="menu-wrapper">
            <h1 className="art-title">Title here</h1>
            <div className="timer-wrapper">
              <CountdownCircleTimer
                isPlaying
                duration={60}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[60, 45, 30, 0]}
                onComplete={() => ({ shouldRepeat: true, delay: 60 })}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
            {this.state.menuVisible
              ? <div className="App-Settings">
                  <hr className="Separator" />
                  <h3>Pick A Color</h3>
                  <CirclePicker
                    onChangeComplete={this.handleCellColor}
                    color={ this.state.cellColor }
                  />
                  <p>Hint: Double click to remove a color</p>
                  <hr className="Separator" />
                </div>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
