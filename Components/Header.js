import React from "react";

function Header(props) {
  return (
    <div>
      <header>
        <div className="header__menu">
          <img className="logo" src="" alt="LOGO" />
          <div className="navv">
            <ul className="nav__links">
              <li className="livestream">
                <a href="#livestream">XEM LIVESTREAM</a>
              </li>
              <li className="info">
                <a href="#info">VỀ HỘI THẢO</a>
              </li>
              <li className="competition">
                <a href="#">CUỘC THI</a>
              </li>
              <li className="contact">
                <a href="#contact">LIÊN HỆ</a>
              </li>
              <li>
                <a className="button" id="btnBuyTicket" href="#buyTicket">
                  MUA VÉ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
