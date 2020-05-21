import React from 'react';
import { shallow } from 'enzyme';
import Code from '../Code';

describe('code block', () => {
  const language = 'java';
  const content = `
    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello world");
        }
    }`;

  it('renders without crashing', async () => {
    shallow(<Code value={content} language={language}/>);
  });
});
