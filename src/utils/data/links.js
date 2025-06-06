import { BsBrowserChrome } from "react-icons/bs";
import { FaDiscord, FaYoutube } from "react-icons/fa";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaSquareInstagram,
} from "react-icons/fa6";
import { PiReadCvLogoDuotone } from "react-icons/pi";

export const links = [
  {
    id: `linkedin-${Date.now()}`,
    desc: `linkedin.com/in/mzilinassim/`,
    title: "linkedin",
    Icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/mzilinassim/",
    color: "#0077b5",
  },
  {
    id: `github-${Date.now()}`,
    desc: `github.com/mziliNassim/`,
    title: "github",
    Icon: FaGithub,
    url: "https://github.com/mziliNassim",
    color: "#16181f",
  },
  {
    id: `Instagram-${Date.now()}`,
    desc: `instagram.com/nassim__dev/`,
    title: "instagram",
    Icon: FaSquareInstagram,
    url: "https://www.instagram.com/nassim__dev/",
    color: "#b60cbc",
  },
  // {
  //   id: `Instagram-bugu-${Date.now()}`,
  //   desc: `instagram.com/bugs_hunting/`,
  //   title: "instagram '@bugs_hunting'",
  //   Icon: FaSquareInstagram,
  //   url: "https://www.instagram.com/bugs_hunting/",
  //   color: "#b60cbc",
  // },
  {
    id: `mail-${Date.now()}`,
    desc: `mzilinassim@gmail.com`,
    title: "E-mail",
    Icon: FaEnvelope,
    url: "mailto:mzilinassim@gmail.com",
    color: "#5f98d1",
  },
  {
    id: `cv-${Date.now()}`,
    desc: `nassim.online/cv`,
    title: "CV -- Nassim MZILI",
    Icon: PiReadCvLogoDuotone,
    url: "https://nassim.online/cv",
    color: "#363636",
  },
  // {
  //   id: `youtube-${Date.now()}`,
  //   desc: `youtube.com/@bugshunting609`,
  //   title: "YouTube",
  //   Icon: FaYoutube,
  //   url: "https://www.youtube.com/@bugshunting609",
  //   color: "#ff0000",
  // },
  // {
  //   id: `discord-${Date.now()}`,
  //   desc: `discord.com/invite/wkaYHKT7`,
  //   title: "discord",
  //   Icon: FaDiscord,
  //   url: "https://discord.com/invite/wkaYHKT7",
  //   color: "#5a26ce",
  // },
  {
    id: `portfolio-${Date.now()}`,
    desc: `https://nassim.online/`,
    title: "Portfolio",
    Icon: BsBrowserChrome,
    url: "https://nassim.online/",
    color: "#1b1b31",
  },
];
