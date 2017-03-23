/* global QUnit, test, equal */

'use strict'

if (typeof module !== 'undefined' && module.exports) {
  var toMarkdown = require('../index')
}

QUnit.module('GitHub Flavored Markdown')

// Test cases are in the format: [html, expectedMarkdown, message]
function runGfmTestCases (testCases) {
  for (var i = 0; i < testCases.length; i++) {
    var testCase = testCases[i]
    equal(toMarkdown(testCase[0], { gfm: true }), testCase[1], testCase[2])
  }
}

test('line breaks', function () {
  runGfmTestCases([
    ['<p>Hello<br>world</p>', 'Hello\nworld']
  ])
})

test('strikethroughs', function () {
  runGfmTestCases([
    ['<del>Lorem ipsum</del>', '~~Lorem ipsum~~', 'del'],
    ['<s>Lorem ipsum</s>', '~~Lorem ipsum~~', 's'],
    ['<strike>Lorem ipsum</strike>', '~~Lorem ipsum~~', 'strike']
  ])
})

test('task lists', function () {
  runGfmTestCases([
    [
      '<ul><li><input type=checkbox>Check Me!</li></ul>',
      '*   [ ] Check Me!',
      'Unchecked inputs'
    ],
    [
      '<ul><li><input type=checkbox checked>Checked!</li></ul>',
      '*   [x] Checked!',
      'Checked inputs'
    ]
  ])
})

test('tables', function () {
  runGfmTestCases([
    [
      ['<table>',
        '  <thead>',
        '    <tr>',
        '      <th>Column 1</th>',
        '      <th>Column 2</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td>Row 1, Column 1</td>',
        '      <td>Row 1, Column 2</td>',
        '    </tr>',
        '    <tr>',
        '      <td>Row 2, Column 1</td>',
        '      <td>Row 2, Column 2</td>',
        '    </tr>',
        '  </tbody',
        '</table>'].join('\n'),

      ['| Column 1 | Column 2 |',
        '| --- | --- |',
        '| Row 1, Column 1 | Row 1, Column 2 |',
        '| Row 2, Column 1 | Row 2, Column 2 |'].join('\n'),

      'Basic table'
    ],
    [
      ['<table>',
        '  <thead>',
        '    <tr>',
        '      <th align="left">Column 1</th>',
        '      <th align="center">Column 2</th>',
        '      <th align="right">Column 3</th>',
        '      <th align="foo">Column 4</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td>Row 1, Column 1</td>',
        '      <td>Row 1, Column 2</td>',
        '      <td>Row 1, Column 3</td>',
        '      <td>Row 1, Column 4</td>',
        '    </tr>',
        '    <tr>',
        '      <td>Row 2, Column 1</td>',
        '      <td>Row 2, Column 2</td>',
        '      <td>Row 2, Column 3</td>',
        '      <td>Row 2, Column 4</td>',
        '    </tr>',
        '  </tbody',
        '</table>'].join('\n'),

      ['| Column 1 | Column 2 | Column 3 | Column 4 |',
        '| :-- | :-: | --: | --- |',
        '| Row 1, Column 1 | Row 1, Column 2 | Row 1, Column 3 | Row 1, Column 4 |',
        '| Row 2, Column 1 | Row 2, Column 2 | Row 2, Column 3 | Row 2, Column 4 |'].join('\n'),

      'Cell alignment'
    ],
    [
      ['<table>',
        '  <thead>',
        '    <tr>',
        '      <th align="left">Column 1</th>',
        '      <th align="center">Column 2</th>',
        '      <th align="right">Column 3</th>',
        '      <th align="foo">Column 4</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td></td>',
        '      <td>Row 1, Column 2</td>',
        '      <td>Row 1, Column 3</td>',
        '      <td>Row 1, Column 4</td>',
        '    </tr>',
        '    <tr>',
        '      <td>Row 2, Column 1</td>',
        '      <td></td>',
        '      <td>Row 2, Column 3</td>',
        '      <td>Row 2, Column 4</td>',
        '    </tr>',
        '    <tr>',
        '      <td>Row 3, Column 1</td>',
        '      <td>Row 3, Column 2</td>',
        '      <td></td>',
        '      <td>Row 3, Column 4</td>',
        '    </tr>',
        '    <tr>',
        '      <td>Row 4, Column 1</td>',
        '      <td>Row 4, Column 2</td>',
        '      <td>Row 4, Column 3</td>',
        '      <td></td>',
        '    </tr>',
        '    <tr>',
        '      <td></td>',
        '      <td></td>',
        '      <td></td>',
        '      <td>Row 5, Column 4</td>',
        '    </tr>',
        '  </tbody',
        '</table>'].join('\n'),
      ['| Column 1 | Column 2 | Column 3 | Column 4 |',
        '| :-- | :-: | --: | --- |',
        '|  | Row 1, Column 2 | Row 1, Column 3 | Row 1, Column 4 |',
        '| Row 2, Column 1 |  | Row 2, Column 3 | Row 2, Column 4 |',
        '| Row 3, Column 1 | Row 3, Column 2 |  | Row 3, Column 4 |',
        '| Row 4, Column 1 | Row 4, Column 2 | Row 4, Column 3 |  |',
        '|  |  |  | Row 5, Column 4 |'
      ].join('\n'),
      'Empty cells'
    ]
  ])
})
