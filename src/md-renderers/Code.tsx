import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import '../scss/renderers.scss';

interface CodeProps {
  value: string;
  language: string;
}

interface CodeState {
  copyButtonText: string;
}

class Code extends Component<CodeProps, CodeState> {
  private static readonly COPY_BUTTON_TEXT = 'Copy to Clipboard';
  private static readonly COPY_TIMEOUT = 2 * 1000; // milliseconds

  constructor(props: CodeProps) {
    super(props);
    this.state = {
      copyButtonText: Code.COPY_BUTTON_TEXT,
    };
  }

  async copyButtonClicked(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.props.value);
      this.setState({ copyButtonText: 'Copied!' });
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        this.setState({ copyButtonText: Code.COPY_BUTTON_TEXT });
      }, Code.COPY_TIMEOUT);
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
        <button className='md-code-btn' onClick={(async (): Promise<void> => this.copyButtonClicked.bind(this)())}>
          {this.state.copyButtonText}
        </button>
      </div>
    );
  }
}

export default Code;
