import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "./NotFound.module.css";

const NotFound: FC = () => {
  return (
    <div className={styled.section}>
      <h1 className={styled.error}>404</h1>
      <div className={styled.page}>
        Ooops!!! The page you are looking for is not found
      </div>
      <Link className={styled["back-home"]} to="/">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
