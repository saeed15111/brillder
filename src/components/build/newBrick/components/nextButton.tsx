import React from "react";
import { useHistory } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from "material-ui";

import { NewBrickStep } from "../model";
import './nextButton.scss';


function NextButton({ step, canSubmit, onSubmit, data, brickId }: any) {
  const history = useHistory()
  const url = "/build/new-brick"

  const next = () => {
    if (canSubmit === true) {
      if (onSubmit) {
        onSubmit(data);
      }
      switch (step) {
        case NewBrickStep.Welcome:
          return history.push(`${url}/brick-title`);
        case NewBrickStep.BrickTitle:
          return history.push(`${url}/open-question`);
        case NewBrickStep.OpenQuestion:
          return history.push(`${url}/brief`);
        case NewBrickStep.Brief:
          return history.push(`${url}/prep`);
        case NewBrickStep.Prep:
          return history.push(`${url}/length`);
        case NewBrickStep.BrickLength:
          return "";
        case NewBrickStep.ProposalReview:
          return history.push(`/build/brick/${brickId}/build/investigation/question`)
      }
    }
  }

  return (
    <div className="tutorial-next-container">
      <IconButton className="tutorial-next-button" onClick={next} aria-label="next">
        <ArrowForwardIosIcon className="tutorial-next-icon" />
      </IconButton>
    </div>
  );
}

export default NextButton
