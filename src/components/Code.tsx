import React, { Component } from 'react';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import 'highlight.js/styles/darcula.css';

import '../scss/Code.scss';

interface CodeProps {
  className: string;
  children: string;
}

interface CodeState {
  copyButtonText: string;
  copyButtonState: CopyButtonState;
  copyButtonTimeOutId?: NodeJS.Timeout;
}

enum CopyButtonState {
  WAITING,
  ACTIVE,
}

export class Code extends Component<CodeProps, CodeState> {
  private static readonly COPY_BUTTON_WAITING_TEXT = 'Copy to Clipboard';
  private static readonly COPY_BUTTON_ACTIVE_TEXT = 'Copied!';
  private static readonly COPY_TIMEOUT = 2 * 1000; // milliseconds

  constructor(props: CodeProps) {
    super(props);
    this.state = {
      copyButtonState: CopyButtonState.WAITING,
      copyButtonText: Code.COPY_BUTTON_WAITING_TEXT,
      copyButtonTimeOutId: undefined,
    };
  }

  async copyButtonClicked(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.props.children);
      if (this.state.copyButtonTimeOutId) {
        clearTimeout(this.state.copyButtonTimeOutId);
      }

      const timeOutId = setTimeout(() => {
        this.setState({
          copyButtonState: CopyButtonState.WAITING,
          copyButtonText: Code.COPY_BUTTON_WAITING_TEXT,
          copyButtonTimeOutId: undefined,
        });
      }, Code.COPY_TIMEOUT);

      this.setState({
        copyButtonState: CopyButtonState.ACTIVE,
        copyButtonText: Code.COPY_BUTTON_ACTIVE_TEXT,
        copyButtonTimeOutId: timeOutId,
      });
    } catch (err) {
      alert('Unable to copy. Please update your browser.');
      console.error(err);
    }
  }

  render(): React.ReactNode {
    // Gatsby returns language as classname e.g.: language-python
    const split = this.props.className.split('-');
    split.shift();
    const language = split.join('-').trim();
    if (typeof this.props.children !== 'string') {
      throw Error('`children` of Code should be a string.');
    }
    const code = this.props.children.trimEnd();
    return (
      <div className='code-container'>
        <SyntaxHighlighter language={language || 'text'} useInlineStyles={false}>
          {code}
        </SyntaxHighlighter>
        <button className='code-btn' onClick={this.copyButtonClicked.bind(this)}>
          {this.state.copyButtonText}
        </button>
      </div>
    );
  }
}
