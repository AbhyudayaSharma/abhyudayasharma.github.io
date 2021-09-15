import React, { FC, HTMLAttributes, KeyboardEvent, SyntheticEvent, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';

import { c } from '../utils/utils-common';
import {
  closeWarningButton,
  formLabel,
  incorrectAnswerPrompt,
  modal,
  modalButton,
  modalButtonPrimary,
  modalContainer,
  questionPrompt,
  responseInput,
} from '../scss/ProtectedEmail.module.scss';

enum EmailState {
  EmailVisible,
  EmailHidden,
  ModalVisible,
}

const getRandomDigits = (count: number): Uint8Array => {
  const randomBytes = new Uint8Array(count);
  window.crypto.getRandomValues(randomBytes);

  for (let i = 0; i < randomBytes.length; i++) {
    randomBytes[i] = (randomBytes[i] % 9) + 1;
  }

  return randomBytes.sort();
};

interface VerificationModalProps {
  onSuccess: () => void;
  onFailure: () => void;
}

const VerificationModal: FC<VerificationModalProps> = (props) => {
  const digitCount = 3;
  const [userInput, setUserInput] = useState<string>('');
  const [randomBytes, setRandomBytes] = useState(getRandomDigits(digitCount));
  const [showWrongAnswerWarning, setShowWrongAnswerWarning] = useState(false);

  const isUserInputValid = (): boolean => {
    return !!userInput.match(/^\d+$/) && !Number.isNaN(Number.parseInt(userInput, 10));
  };

  // closes the modal when the escape key is pressed
  const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Escape') {
      props.onFailure();
    }
    e.stopPropagation();
  };

  const answerInputHtmlId = 'responseInput';
  const answerInputPlaceholder = 'Answer';
  const answerInput = <input type="number" min={0} max={randomBytes.length * 10} value={userInput} aria-required={true}
                             id={answerInputHtmlId} className={responseInput} placeholder={answerInputPlaceholder}
                             size={Math.max(userInput ? userInput.length : 0, answerInputPlaceholder.length)}
                             onChange={(e): void => setUserInput(e.target.value)} data-autofocus={true}/>;

  const formSubmitted = (e: SyntheticEvent): void => {
    e.preventDefault(); // do not send a POST

    const sum = randomBytes.reduce((a, b) => a + b, 0);
    if (isUserInputValid() && Math.abs(sum - Number.parseInt(userInput, 10)) < 1e-3) {
      props.onSuccess();
    }

    unstable_batchedUpdates(() => {
      setUserInput('');
      setShowWrongAnswerWarning(true);
      setRandomBytes(getRandomDigits(digitCount));
    });
  };

  const focusLockProps: HTMLAttributes<HTMLDivElement> = {
    onClick: props.onFailure,
    onKeyDown: keyPressHandler,
    tabIndex: -1, // tabIndex needed to gain access to keyDown events https://stackoverflow.com/a/44434971/6306974
  };

  return (<RemoveScroll allowPinchZoom={true}>
    <FocusLock className={modalContainer} as="div" lockProps={focusLockProps}>
      <div className={modal} role="dialog" aria-modal="true" onClick={(e): void => e.stopPropagation()}>
        {showWrongAnswerWarning && <div className={incorrectAnswerPrompt} role="alert">
        <span>
          Incorrect Answer! Please try again.
        </span>
          <button role="button" aria-label="Close wrong answer warning" className={closeWarningButton}
                  onClick={(): void => setShowWrongAnswerWarning(false)}>
            ❌
          </button>
        </div>}
        <p className={questionPrompt}>
          Please verify that you are a human by solving this problem.
        </p>
        <form onSubmit={formSubmitted} autoComplete="off" autoCapitalize="off" autoCorrect="off">
          <div>
            <label htmlFor={answerInputHtmlId} className={formLabel}>
              What is the sum of {randomBytes.slice(0, randomBytes.length - 1).join(', ')}, and {
              randomBytes[randomBytes.length - 1]}?
            </label>
          </div>
          <div>
            {answerInput}
          </div>
          <div>
            <button type="submit" className={c(modalButton, modalButtonPrimary)}
                    disabled={!isUserInputValid()}>Submit
            </button>
            <button type="button" className={modalButton} onClick={props.onFailure}>Cancel</button>
          </div>
        </form>
      </div>
    </FocusLock>
  </RemoveScroll>);
};

const obfuscatedEmail: Readonly<Int16Array> = new Int16Array([
  18523, 18522, 18501, 18547, 18464, 18553, 18517, 18549, 18521, 18515, 18503, 18500,
  18518, 18503, 18555, 18544, 18526, 18523, 18508, 18508, 18501, 18513, 18512, 18524,
  18509, 18529, 18519, 18516, 18506, 18562, 18509, 18518, 18510, 18511, 18562, 18514,
]);

// Do not use this component directly; use ProtectedEmail.
const __ProtectedEmail: FC = () => {
  const [emailState, setEmailState] = useState(EmailState.EmailHidden);

  const buttonOnClick = (): void => {
    setEmailState(EmailState.ModalVisible);
  };

  switch (emailState) {
    case EmailState.EmailHidden:
      return <button onClick={buttonOnClick}>Click to reveal email</button>;
    case EmailState.EmailVisible: {
      const base64Chars: Array<string> = [];
      obfuscatedEmail.slice().reverse().map((x, idx) => ((~x ^ idx) - 0x3b74a))
        .forEach(x => base64Chars.push(String.fromCharCode(x)));
      const email = atob(base64Chars.join(''));
      return <a href={`mailto:${email}`}>{email}</a>;
    }
    case EmailState.ModalVisible:
      return <>
        <p>[Verification Pending]</p>
        <VerificationModal onSuccess={(): void => setEmailState(EmailState.EmailVisible)}
                           onFailure={(): void => setEmailState(EmailState.EmailHidden)}/>
      </>;
    default:
      throw new Error(`Unknown state: ${emailState}`);
  }
};

export default __ProtectedEmail;
