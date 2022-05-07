import React from "react";

function Section(props) {
  return (
    <div>
      <section className="carousel">
        <div className="carousel__content">
          <div className="meeting">
            <p>HỘI THẢO</p>
          </div>
          <p className="soi">
            SOI
            <span className="slogan">(Với Font và ảnh đẹp hơn) </span>
          </p>
        </div>
        <div className="carousel__contact">
          <span>Follow us</span>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin-in"></i>
          <i className="fab fa-facebook-f"></i>
        </div>
        <div className="carousel__scrolldown">
          <span>KÉO XUỐNG</span>
          <i className="fa fa-arrow-down"></i>
        </div>
      </section>
    </div>
  );
}

export default Section;
