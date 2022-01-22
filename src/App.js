import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, Modal, Form, FormControl, Button, Offcanvas, Container } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';


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

        <div className={this.state.menuVisible ? "Canvas" : "Canvas full-width"}>
            <h2>Design Canvas</h2>
            <table
              id="pixel_canvas"
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

        <div className="App-Content">
          {this.state.menuVisible
            ? <div className="App-Settings">
                <h2>Canvas Settings</h2>
                {/*<h3>Choose Grid Size</h3>*/}
                <form id="sizePicker">
                  <label>
                  <FontAwesomeIcon icon="" /> X Position:
                  <input
                    type="number"
                    id="input_height"
                    name="height"
                    min="1"
                    value={this.state.x}    // updates the y value that the person wants to change
                    onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                  <FontAwesomeIcon icon="" /> Y Position:
                  <input
                    type="number"
                    id="input_width"
                    name="width"
                    min="1"
                    value={this.state.y}    // updates the x value that the person wants to change
                    onChange={this.handleChange} />
                  </label>
                  <p>
                  <input
                    type="submit"
                    id="input_submit"
                    value="Paint Square"
                    onClick={this.handleSubmit} />
                  </p>
                </form>

                <hr className="Separator" />

                <h3>Pick A Color</h3>
                <CirclePicker
                  onChangeComplete={this.handleCellColor}
                  color={ this.state.cellColor }
                />
                <p>Hint: Double click to remove a color</p>
              </div>
            : null
          }

          <div className={this.state.menuVisible ? "mobile-menu menu-open" : "mobile-menu menu-closed"}>
            <button className="show-settings" onClick={this.mobileMenu}>
              {this.state.menuVisible
                ? <FontAwesomeIcon icon="angle-left" size="lg" />
                : <FontAwesomeIcon icon="angle-right" size="lg" />
              }
            </button>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
