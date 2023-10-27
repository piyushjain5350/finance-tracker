import React from "react";
import {MdOutlineEmail} from 'react-icons/md';
import {AiOutlineGithub} from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';
import {AiFillTwitterCircle} from 'react-icons/ai';


function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="footer flex justify-between p-8 text-[var(--black)] bg-[var(--white)] h-[10%]">
      <p className="hidden sm:block  logo md:text-xl font-bold " onClick={() => topFunction()}>
        Financely<span className="text-[var(--blue)]">.</span>
      </p>

      <p className="hidden sm:block md:text-xl font-semibold">Made By Piyush Jain❤️</p>

      <div className="social-links flex gap-8">
        <a href="https://github.com/piyushjain5350" target="_blank">
          <AiOutlineGithub />
        </a>
        <a href="mailto:piyushjain5350@gmail.com" target="_blank">
          <MdOutlineEmail />
        </a>
        <a href="https://www.twitter.com/piyushj147" target="_blank">
          <AiFillTwitterCircle/>
        </a>
        <a href="https://www.linkedin.com/in/piyushj147/" target="_blank">
          <AiFillLinkedin/>
        </a>
      </div>
    </div>
  );
}

export default Footer;