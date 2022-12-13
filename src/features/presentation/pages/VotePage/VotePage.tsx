import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  ChangeEvent,
  FC,
  FormEventHandler,
  memo,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PresentationApiService } from "src/api/services/presentation-api";
import { AppLoadingSpinner } from "src/components/AppLoadingSpinner";
import { Presentation } from "src/models/presentation";
import { io } from "socket.io-client";

import styles from "./VotePage.module.css";
import { Socket } from "socket.io-client/build/esm/socket";
import { Answer, Slide } from "src/models/slide";
import { useSnackbar } from "notistack";
import { LocalStorageService } from "src/api/services/local-storage";
import { AxiosError } from 'axios';

const VotePageComponent: FC = () => {
  const { id } = useParams();
  const data = useQuery<Presentation>(
    "getPresentationJoin",
    PresentationApiService.getPresentationById.bind(null, id!)
  );
  const [socket, setSocket] = useState<Socket>();
  const [detail, setDetail] = useState<Presentation>();
  const [selectedVote, setSelectedVote] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [isVoting, setIsVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    setSocket(io("https://dnlearning-socket-server.onrender.com", { transports: ["websocket"] }));
  }, []);

  useEffect(() => {
    setDetail(data.data);
  }, [data.data]);

  useEffect(() => {
    if (detail) {
      setIsVoted(LocalStorageService.getAnsweredSlideId().includes(detail.current!))
    }
  }, [detail])

  useEffect(() => {
    socket?.emit("AddStudent", id);
    socket?.on("ChangedSlide", (slideId: Slide["id"]) => {
      setDetail((prev) => {
        if (prev) {
          return {
            ...prev,
            current: slideId,
          };
        }
        return prev;
      });
    });
  }, [socket]);

  if (data.isLoading) {
    return <AppLoadingSpinner />;
  }

  if (data.isError || detail == null) {
    return <h1>Presentation not found</h1>;
  }

  const slide = detail.slides.find((slide) => slide.id === detail.current);

  if (slide == null) {
    return <h1>Slide not found</h1>;
  }

  const voteChangeHandler = (event: ChangeEvent, value: string) => {
    setSelectedVote(value);
  };

  const voteHandler = () => {
    if (id == null) {
      return;
    }
    setIsVoting(true);
    PresentationApiService.voteQuestion(id, selectedVote)
      .then(() => {
        setIsVoting(false);
        LocalStorageService.saveAnsweredSlide(detail.current);
        setIsVoted(true);
        socket?.emit("AnswerQuestion", selectedVote)
      })
      .catch((error) => {
        setIsVoting(false);
        if (error instanceof AxiosError) {
          enqueueSnackbar(error.response?.data?.message, {
            variant: "error",
          })
        } else {
          enqueueSnackbar("Something went wrong. Try again later!", {
            variant: "error",
          });
        }
      });
  };

  return (
    <div className={styles["presentation"]}>
      <div className={styles["presentation__name"]}>{detail.name}</div>
      {isVoted ?
        <div className={styles['presentation__note']}>
        Voted successfully! Waiting for next slide...
      </div>
       : <FormControl>
        <FormLabel
          className={styles["presentation__question"]}
          id="demo-radio-buttons-group-label"
        >
          {slide.question}
        </FormLabel>
        <RadioGroup
          className={styles["presentation__options"]}
          onChange={voteChangeHandler}
        >
          {slide.answers.map((option, index) => (
            <FormControlLabel
              className={styles["presentation__option"]}
              key={index}
              value={option.id}
              control={<Radio />}
              label={option.answer}
            />
          ))}
        </RadioGroup>
        <Button
          disabled={isVoting || slide.answers.find(a => a.id === selectedVote) == null}
          onClick={voteHandler}
          className={styles["presentation__button"]}
          type="submit"
          variant="contained"
        >
          {isVoting ? <CircularProgress size={20}/> : 'Submit'}
        </Button>
      </FormControl>}
    </div>
  );
};

export const VotePage = memo(VotePageComponent);
