import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Hint from "./Hint";

storiesOf("QuestionHintComponent", module)
  .add("HintWithoutValues", () => <Hint index={1} locked={false} list={[]} onChange={() => {}} />)
  .add("HintWithText", () => <Hint index={1} locked={false} list={[]} value="Some text" onChange={() => {}} />)
  .add("HintLocked", () => <Hint index={1} locked={true} list={[]} value="Some text" onChange={() => {}} />)
  .add("HintWithAllAnswers", () => <Hint index={1} locked={false} list={[]} status={1} onChange={() => {}} />);
