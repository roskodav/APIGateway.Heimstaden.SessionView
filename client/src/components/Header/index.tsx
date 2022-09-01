import React from "react";
import PrintButton from "./PrintButton";
import Logo from "./Logo";

const Header = () => (
  <header>
    <Logo />
    <div className="d-flex align-items-center">
      <div className="text-right">
        <span id="company_name" />
        <br />
        <a href="https://app.mluvii.com/" id="log_in" rel="noreferrer" target="_blank">
          Log in
        </a>
      </div>
      <div className="separator h-100" />
      <PrintButton />
    </div>
  </header>
);

export default Header;
