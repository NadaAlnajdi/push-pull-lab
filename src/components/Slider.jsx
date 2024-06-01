import React, { Component } from "react";

export default class Slider extends Component {
  render() {
    return (
      <div id="autoplay" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/2.jpeg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/3.jpeg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/4.jpeg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#autoplay"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#autoplay"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}
