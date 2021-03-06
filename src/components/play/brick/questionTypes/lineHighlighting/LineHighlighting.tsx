import React from "react";

import "./LineHighlighting.scss";
import CompComponent from "../Comp";
import {CompQuestionProps} from '../types';
import { ComponentAttempt } from "components/play/brick/model/model";
import ReviewGlobalHint from "../../baseComponents/ReviewGlobalHint";


interface LineHighlightingProps extends CompQuestionProps {
  attempt: ComponentAttempt;
  answers: number[];
}

interface LineHighlightingState {
  userAnswers: any[];
  lines: any[];
}

class LineHighlighting extends CompComponent<
  LineHighlightingProps,
  LineHighlightingState
> {
  constructor(props: LineHighlightingProps) {
    super(props);
    this.state = { userAnswers: [], lines: props.component.lines };
  }

  componentWillReceiveProps(props: LineHighlightingProps) {
    this.setState({ lines: props.component.lines });
  }

  getAnswer(): number[] {
    return this.state.lines
      .map((line, index) => ({ w: line, i: index }))
      .filter(line => line.w.selected === true)
      .map(line => line.i);
  }

  mark(attempt: any, prev: any): any {
    let markIncrement = prev ? 2 : 5;
    attempt.correct = true;
    attempt.marks = 0;
    attempt.maxMarks = this.state.lines.length * 5;

    this.state.lines.forEach((line: any, index: number) => {
      if (attempt.answer.indexOf(index) !== -1 && line.checked === true) {
        if (!prev) {
          attempt.marks += markIncrement;
        } else {
          if (prev.answer.indexOf(index) === -1) {
            attempt.marks += markIncrement;
          }
        }
      } else if (
        line.checked === false &&
        attempt.answer.indexOf(index) === -1
      ) {
        if (!prev) {
          attempt.marks += markIncrement;
        }
      } else {
        attempt.correct = false;
      }
    });

    if (attempt.marks === 0 && !prev) {
      attempt.marks = 1;
    }
    return attempt;
  }

  highlighting(index: number) {
    this.state.lines[index].selected = !this.state.lines[index].selected;
    this.setState({ lines: this.state.lines });
  }

  render() {
    const { component } = this.props;
    if (this.props.isPreview === true && (!component.lines || component.lines.length === 0)) {
      return <div>Lines will appear here in correction mode.</div>
    }

    return (
      <div className="line-highlighting-play">
        <div className="lines-container">
          {component.lines.map((line: any, index: number) => (
            <div key={index}>
              <span
                className={line.selected ? "active line" : "line"}
                onClick={() => this.highlighting(index)}
              >
                {line.text}
              </span>
            </div>
          ))}
        </div>
        <br/>
        <ReviewGlobalHint
          attempt={this.props.attempt}
          isPhonePreview={this.props.isPreview}
          hint={this.props.question.hint}
        />
      </div>
    );
  }
}

export default LineHighlighting;
