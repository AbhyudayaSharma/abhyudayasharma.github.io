import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import '../scss/renderers.scss';

interface CodeProps {
  value: string;
  language: string;
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

class Code extends Component<CodeProps, CodeState> {
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
      await navigator.clipboard.writeText(this.props.value);
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
    return (
      <div className='md-code'>
        <SyntaxHighlighter language={this.props.language} style={darcula}>
          {this.props.value}
        </SyntaxHighlighter>
        <button className='md-code-btn' onClick={this.copyButtonClicked.bind(this)}>
          {this.state.copyButtonText}
        </button>
      </div>
    );
  }
}

export default Code;
