import * as React from 'react';

import {
  ContentEditableWrapper,
  ContentEditableInput,
} from './style';
import { setRange } from 'src/utils/utils';

export interface IProps {
  id?: string;
  className?: string;
  style?: object;
  contenteditable?: boolean;
  spellCheck?: boolean;
  parentNodeWithAutoFocus?: string;
  placeholder?: string;
  html: string;
  onChange?: (
    e: any,
  ) => void;
}
interface IState {
};


export class BaseContentEditable extends React.PureComponent<IProps, IState> {

  public ref: any = React.createRef();

  public _error = (e: string) => {
    throw new Error(e);
  }

  public _findOneParent = (): any => {
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

  public _setRange = (
    ref: HTMLElement,
    callback?: () => void,
  ) => {
    const sel: Selection = window.getSelection();
    const range: Range = document.createRange();

    callback && callback();

    range.setStart(ref, ref.childNodes.length);
    range.setEnd(ref, ref.childNodes.length);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  public handleBlur = () => {
    if (this._findOneParent()) {
      const node = this._findOneParent() as HTMLElement;
      const ref: any = this.ref;

      node.addEventListener('click', () => {
        ref.focus();
        setRange(ref);
      }, true);
    }
  }

  public handleChange = (e: React.KeyboardEvent) => {
    this.props.onChange && this.props.onChange(e);
  }

  public render(): JSX.Element {
    const className = this.props.className
      ? this.props.className
      : '';

    return (
      <ContentEditableWrapper>
        <ContentEditableInput
          id={this.props.id || 'yo-contenteditable'}
          className={className + ' yo-contenteditable'}
          contentEditable={this.props.contenteditable ||true}
          spellCheck={this.props.spellCheck || false}
          style={this.props.style || {}}
          placeholder={this.props.placeholder}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
          ref={this.ref}
          onBlur={this.handleBlur}
          onKeyUp={this.handleChange}
        />
      </ContentEditableWrapper>
    );
  }
}