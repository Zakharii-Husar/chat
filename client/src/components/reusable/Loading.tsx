import { BiLoaderCircle } from "react-icons/bi";
import { Spinner } from "react-bootstrap";
import React from "react";
import "./Loading.scss";

interface LoadingProps {
  centered?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ centered = false }) => {
  return (
    <div className={`d-flex justify-content-center${centered ? ' loading-absolute-center' : ''}`}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
