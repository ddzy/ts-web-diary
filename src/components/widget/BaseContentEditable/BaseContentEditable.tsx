import * as React from 'react';

import {
  ContentEditableWrapper,
  ContentEditableInput,
} from './style';

export interface IProps {
  id?: string;
  className?: string;
  style?: object;
  contenteditable?: boolean;
  spellCheck?: boolean;
  parentNodeWithAutoFocus?: string;
  html: string;
}
interface IState {
};


export default class BaseContentEditable extends React.PureComponent<IProps, IState> {

  public ref: React.Ref<HTMLDivElement> = React.createRef();

  public _error = (e: string) => {
    throw new Error(e);
  }

  public _findOneParent = () => {
    const parent = this.props.parentNodeWithAutoFocus;
    let finalNode = null;

    if (parent) {
      try {
        finalNode = document.querySelector(parent);
      } catch (e) {
        this._error(`The specified node ${parent} does not exist, please enter another.`);
      }

      return finalNode;
    }
  }

  public handleSetRef = (ref: React.Ref<HTMLDivElement>) => {
    this.ref = ref;
  }

  public handleSetRange = (
    callback?: () => void,
  ) => {
    const sel: Selection = window.getSelection();
    const range: Range = document.createRange();
    const ref: any = this.ref;

    callback && callback();

    range.setStart(ref, ref.childNodes.length);
    range.setEndAfter(ref);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  public handleBlur = () => {
    const pNode = this._findOneParent();

    console.log(pNode);
  }

  public render(): JSX.Element {
    return (
      <ContentEditableWrapper>
        <ContentEditableInput
          id={this.props.id || 'yo-contenteditable'}
          className={this.props.className || 'yo-contenteditable'}
          contentEditable={this.props.contenteditable ||true}
          spellCheck={this.props.spellCheck || false}
          style={this.props.style || {}}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
          innerRef={this.handleSetRef}
          onBlur={this.handleBlur}
        />
      </ContentEditableWrapper>
    );
  }
}