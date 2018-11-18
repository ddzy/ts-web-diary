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

  public render(): JSX.Element {
    return (
      <ContentEditableWrapper>
        <ContentEditableInput
          id={this.props.id || 'yo-contenteditable'}
          className={this.props.className && this.props.className + ' yo-contenteditable'}
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