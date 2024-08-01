import React from "react";
import {IoBanOutline} from "react-icons/io5";
import {FaCircle} from "react-icons/fa";

export default function GreyBanmark() {
    return (
        <span className="me-1 position-relative">
          <IoBanOutline className="text-tertiary me-1 mt-2 position-absolute fs-5"/>
          <FaCircle className="text-white me-1 fs-6"/>
        </span>
    );
}