import { BsBrowserChrome } from "react-icons/bs";
import { FaDiscord, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaSquareInstagram,
} from "react-icons/fa6";
import { PiReadCvLogoDuotone } from "react-icons/pi";
import { personalData } from "./personal-data";

export const links = [
  {
    id: `linkedin-${Date.now()}`,
    desc: `linkedin.com/in/mzilinassim/`,
    title: "LinkedIn",
    Icon: FaLinkedinIn,
    url: personalData.linkedIn,
    color: "#0077b5",
    hover: "hover:text-blue-400",
  },
  {
    id: `github-${Date.now()}`,
    desc: `github.com/mziliNassim/`,
    title: "github",
    Icon: FaGithub,
    url: "https://github.com/mziliNassim",
    color: "#16181f",
    hover: "hover:text-gray-300",
  },
  {
    id: `Instagram-${Date.now()}`,
    desc: `instagram.com/nassim__dev/`,
    title: "Instagram",
    Icon: FaSquareInstagram,
    url: personalData.instagram,
    color: "#b60cbc",
    hover: "hover:text-pink-400",
  },
  {
    id: `mail-${Date.now()}`,
    desc: `mzilinassim@gmail.com`,
    title: "Email",
    Icon: FaEnvelope,
    url: "mailto:mzilinassim@gmail.com",
    color: "#5f98d1",
    hover: "hover:text-green-400",
  },
  {
    id: `cv-${Date.now()}`,
    desc: `https://nassim.online/mycv`,
    title: "Resume - CV",
    Icon: PiReadCvLogoDuotone,
    url: personalData.fullResume,
    color: "#363636",
    hover: "",
  },
  {
    id: `portfolio-${Date.now()}`,
    desc: `https://nassim.online/`,
    title: "Portfolio",
    Icon: BsBrowserChrome,
    url: personalData.Website,
    color: "#1b1b31",
    hover: "",
  },
  {
    id: `twitter-${Date.now()}`,
    desc: `twitter.com/nassim__dev`,
    title: "Twitter",
    Icon: FaTwitter,
    url: personalData.twitter,
    color: "#1DA1F2",
    hover: "hover:text-cyan-400",
  },
  {
    id: `fb-${Date.now()}`,
    desc: `facebook.com/mziliNassim/`,
    title: "Facebook",
    Icon: FaFacebook,
    url: personalData.facebook,
    color: "#1877F2", // Facebook's brand color
    hover: "hover:text-blue-500",
  },
];

// [
//   {
//     id: `Instagram-bugu-${Date.now()}`,
//     desc: `instagram.com/bugs_hunting/`,
//     title: "instagram '@bugs_hunting'",
//     Icon: FaSquareInstagram,
//     url: "https://www.instagram.com/bugs_hunting/",
//     color: "#b60cbc",
//     hover: "",
//   },

//   {
//     id: `youtube-${Date.now()}`,
//     desc: `youtube.com/@bugshunting609`,
//     title: "YouTube",
//     Icon: FaYoutube,
//     url: "https://www.youtube.com/@bugshunting609",
//     color: "#ff0000",
//     hover: "",
//   },
//   {
//     id: `discord-${Date.now()}`,
//     desc: `discord.com/invite/wkaYHKT7`,
//     title: "discord",
//     Icon: FaDiscord,
//     url: "https://discord.com/invite/wkaYHKT7",
//     color: "#5a26ce",
//     hover: "",
//   },
// ];
