import React from 'react';

import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
  <>
  <hr className="border-gray-700" />
  <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-screen-2xl container mx-auto px-4 md:px-20">
            <div className="flex flex-col items-center justify-center"> 
            <ul className="flex space-x-5">
                  <li>
                    <a href="https://github.com/akash-srivastav02" target="_blank" rel="noopener noreferrer">
                      <FaSquareGithub className="text-2xl cursor-pointer hover:text-gray-400"/>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/akash-srivastav02/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="text-2xl cursor-pointer hover:text-gray-400"/>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/codesskyy/" target="_blank" rel="noopener noreferrer">
                      <FaInstagramSquare className="text-2xl cursor-pointer hover:text-gray-400" />
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/sky_srivastav" target="_blank" rel="noopener noreferrer">
                      <FaSquareXTwitter className="text-2xl cursor-pointer hover:text-gray-400"/>
                    </a>
                  </li>
               </ul>
                <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col items-center">
                    <p className="text-sm text-gray-400">
                        &copy; 2025 Akash Srivastav. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
  </footer>
  </>
  )
}

export default Footer;
