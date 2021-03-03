import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as codeTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from '../scss/Code.module.scss';

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

export default class Code extends Component<CodeProps, CodeState> {
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
    const language = this.props.className.replace(/^language-/, '');

    if (typeof this.props.children !== 'string') {
      throw Error('`children` of Code should be a string.');
    }

    const code = this.props.children.trimEnd();
    return (
      <div className={styles.container}>
        <SyntaxHighlighter language={language} style={codeTheme} tabIndex={0}>
          {code}
        </SyntaxHighlighter>
        <button className={styles.btn} onClick={this.copyButtonClicked.bind(this)} tabIndex={0}>
          {this.state.copyButtonText}
        </button>
      </div>
    );
  }
}
