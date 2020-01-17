const { createMacro, } = require('babel-plugin-macros');
const fs = require('fs');

const testFunction2 = ({ referencePath, state, babel, }) => {
  const file = fs.readFileSync('C:/Users/Abhyudaya/Desktop/test.c');
  const t = babel.types;
  referencePath.replaceWith(t.expressionStatement(t.stringLiteral(file.toString())));
};

const testFunction = ({ references, state, babel, }) => {
  // lets walk through all calls of the macro
  references.default.forEach(referencePath => {
    testFunction2({ referencePath, state, babel, });
  });
};

module.exports = createMacro(testFunction);
