import {
  HintStatus, Question, QuestionTypeEnum
} from "model/question";
import {getUniqueComponent} from './QuestionService';


export function convertToSort(question: Question) {
  const updatedQuestion = Object.assign({}, question);
  updatedQuestion.type = QuestionTypeEnum.Sort;
  updatedQuestion.hint = {
    status: HintStatus.All,
    value: question.hint.value,
    list: []
  };
  return updatedQuestion;
}

export function convertToShortAnswer(question: Question) {
  const updatedQuestion = Object.assign({}, question);
  updatedQuestion.type = QuestionTypeEnum.ShortAnswer;
  updatedQuestion.hint = {
    status: HintStatus.All,
    value: question.hint.value,
    list: []
  };
  const component = getUniqueComponent(updatedQuestion);
  if (component.list && component.list.length > 0) {
    component.list = [component.list[0]];
    if (component.list[0].value) {
      component.list[0].value = stripHtml(component.list[0].value);
    }
  }
  return updatedQuestion;
}

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}