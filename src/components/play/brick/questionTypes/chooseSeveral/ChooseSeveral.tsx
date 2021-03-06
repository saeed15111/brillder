import React from 'react';
import { Button, Grid } from '@material-ui/core';

import './ChooseSeveral.scss';
import CompComponent from '../Comp';
import {ComponentAttempt} from 'components/play/brick/model/model';
import DenimTickRect from 'components/play/components/DenimTickRect';
import DenimCrossRect from 'components/play/components/DenimCrossRect';
import ReviewEachHint from 'components/play/brick/baseComponents/ReviewEachHint';
import ReviewGlobalHint from 'components/play/brick/baseComponents/ReviewGlobalHint';
import {CompQuestionProps} from '../types';
import MathInHtml from '../../baseComponents/MathInHtml';
import { QuestionValueType } from 'components/build/investigationBuildPage/buildQuestions/questionTypes/types';


interface ChooseSeveralProps extends CompQuestionProps {
  component: any;
  attempt: any;
  answers: number[];
}

interface ChooseSeveralState {
  activeItems: number[];
}

class ChooseSeveral extends CompComponent<ChooseSeveralProps, ChooseSeveralState> {
  constructor(props: ChooseSeveralProps) {
    super(props);

    let activeItems: number[] = [];
    if (props.answers && props.answers.length > 0) {
      activeItems = props.answers;
    } else if (props.attempt?.answer.length > 0) {
      activeItems = Object.assign([], props.attempt.answer);
    }

    this.state = { activeItems };
  }

  setActiveItem(activeItem: number) {
    let { activeItems } = this.state;
    let found = activeItems.indexOf(activeItem);
    if (found >= 0) {  
      activeItems.splice(found, 1);
    } else {
      activeItems.push(activeItem);
    }
    this.setState({ activeItems });
  }

  getAnswer(): number[] {
    return this.state.activeItems;
  }

  getState(entry: number): number {
    if (this.props.attempt.answer[entry]) {
      if (this.props.attempt.answer[entry].toLowerCase().replace(/ /g, '') === this.props.component.list[entry].answer.toLowerCase().replace(/ /g, '')) {
        return 1;
      } else { return -1; }
    } else { return 0; }
  }

  markLiveChoices(attempt: ComponentAttempt, markIncrement: number) {
    const choices = this.props.component.list;
    for (let [index, choice] of choices.entries()) {
      const checked = attempt.answer.find((answer:number) => answer === index);
      if (checked >= 0) {
        if (choice.checked) {
          attempt.marks += markIncrement;
        } else {
          attempt.marks -= markIncrement;
          attempt.correct = false;
        }
      } else {
        if (choice.checked) {
          attempt.marks -= markIncrement;
          attempt.correct = false;
        }
      }
    }
  }

  getCorrectAnswers() {
    let count = 0;
    for (let item of this.props.component.list) {
      if (item.checked) {
        count += 1;
      }
    }
    return count;
  }

  mark(attempt: ComponentAttempt, prev: ComponentAttempt): ComponentAttempt {
    let correctAnswers = this.getCorrectAnswers();
    const markValue = 5;
    const markIncrement = prev ? Math.floor(markValue / correctAnswers) : markValue;

    attempt.correct = true;
    attempt.marks = 0;

    attempt.maxMarks = correctAnswers * markValue;
    this.markLiveChoices(attempt, markIncrement);

    // Then, if the attempt scored no marks or negative and the program is in live phase, then give the student a mark.
    if (attempt.marks <= 0 && attempt.answer !== [] && !prev) { attempt.marks = 1; }
    if (attempt.marks <= 0) {attempt.marks = 0; }
    return attempt;
  }

  renderIcon(input: any, index: number) {
    if (this.props.attempt) {
      const {answer} = this.props.attempt;
      const found = answer.find((a:number) => a === index);
      if (found >= 0) {
        return input.checked ? <DenimTickRect /> : <DenimCrossRect />;
      }
    }
    return "";
  }

  renderEachHint(index: number) {

  }

  renderData(answer: any) {
    if (answer.answerType === QuestionValueType.Image) {
      return <img alt="" src={`${process.env.REACT_APP_BACKEND_HOST}/files/${answer.valueFile}`} />;
    } else {
      return <MathInHtml value={answer.value} />;
    }
  }

  renderButton(input: any, index:number) {
    let active = this.state.activeItems.find(i => i === index) as number;

    return (
      <Button
        className={(active >= 0) ? "choose-choice active" : "choose-choice"}
        key={index}
        onClick={() => this.setActiveItem(index)}
      >
        <div style={{width: '100%'}}>
        <Grid container direction="row">
          <Grid item xs={1}>
            {this.renderIcon(input, index)}
          </Grid>
          <Grid item xs={11}>
            {this.renderData(input)}
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={11}>
            <ReviewEachHint
              isPhonePreview={this.props.isPreview}
              attempt={this.props.attempt}
              index={index}
              hint={this.props.question.hint}
            />
          </Grid>
        </Grid>
        </div>
      </Button>
    );
  }

  render() {
    const { component } = this.props;

    return (
      <div className="choose-one-live">
        {
          component.list.map((input: any, index: number) => this.renderButton(input, index))
        }
        <ReviewGlobalHint
          attempt={this.props.attempt}
          isPhonePreview={this.props.isPreview}
          hint={this.props.question.hint}
        />
      </div>
    );
  }
}

export default ChooseSeveral;
