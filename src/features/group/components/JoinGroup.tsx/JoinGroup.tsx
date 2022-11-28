import { Button } from "@mui/material";
import { FC, memo } from "react";
import style from "./JoinGroup.module.css";

interface Props {
  name: string;
  onClick: () => void;
}

const JoinGroupComponent: FC<Props> = ({ name, onClick }) => {
  return (
    <div className={style['join']}>
      <h1 className={style['join__title']}>
        Click the below button to join <span className={style['join__group-name']}>{name}</span>
      </h1>
      <Button
        className={style['join__button']}
        type="button"
        onClick={onClick}
        color="success"
        variant="contained"
      >
        JOIN
      </Button>
    </div>
  );
};

export const JoinGroup = memo(JoinGroupComponent);
