import React from 'react';
import { Grid, Stepper, Step, StepButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import update from 'immutability-helper';

import './Live.scss';
import { Brick } from 'model/brick';
import CircleIconNumber from 'components/play/components/circleIcon/circleIcon';
import { Question } from "components/model/question";
import QuestionLive from './QuestionLive';


interface IntroductionProps {
  brick: Brick;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const LivePage: React.FC<IntroductionProps> = ({ brick, ...props }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  let { questions } = brick;
  const theme = useTheme();

  const handleStep = (step: number) => () => {
    questions[activeStep].edited = true;
    setActiveStep(step);
  };

  function isStepComplete(step: number) {
    return step < activeStep;
  }

  const next = () => {
    questions[activeStep].edited = true;
    setActiveStep(update(activeStep, { $set: activeStep + 1 }));
  }

  const renderQuestion = (question: Question) => {
    let isLastOne = (questions.length - 1) === activeStep;
    return <QuestionLive question={question} isLastOne={isLastOne} next={next} />
  }
  console.log(activeStep)

  return (
    <Grid container direction="row" justify="center">
      <div className="brick-container">
        <div className='introduction-page'>
          <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {questions.map((question, index) => {
              const stepProps: { completed?: boolean } = {};
              const buttonProps: { optional?: React.ReactNode } = {};
              if (index === activeStep) {
                return (
                  <Step key={index} {...stepProps}>
                    <StepButton
                      icon={<CircleIconNumber number={index + 1} />}
                      onClick={handleStep(index)}
                      completed={isStepComplete(index)}
                      {...buttonProps}
                    >
                    </StepButton>
                  </Step>
                );
              }
              if (question.edited) {
                return (
                  <Step key={index} {...stepProps}>
                    <StepButton
                      icon={<CreateIcon className="edited-step-icon"/>}
                      onClick={handleStep(index)}
                      completed={isStepComplete(index)}
                      {...buttonProps}
                    >
                    </StepButton>
                  </Step>
                );
              }
              return (
                <Step key={index} {...stepProps}>
                  <StepButton
                    icon={<CircleIconNumber customClass="grey-icon" number={index + 1} />}
                    onClick={handleStep(index)}
                    completed={isStepComplete(index)}
                    {...buttonProps}
                  >
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStep}
          >
            {
              questions.map((question, index) =>
                <TabPanel key={index} index={index} value={activeStep} dir={theme.direction}>
                  {renderQuestion(question)}
                </TabPanel>
              )
            }
          </SwipeableViews>
        </div>
      </div>
    </Grid>
  );
}

export default LivePage;
