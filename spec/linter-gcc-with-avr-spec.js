"use babel";

describe('The GCC provider for AtomLinter', () => {
  const main = require('../lib/main')
  const utility = require('../lib/utility.js')
  var settings = require("../lib/config").settings

  beforeEach(() => {
    waitsForPromise(() => {
      main.messages = {};
      atom.config.set('linter-gcc-with-avr.execPath', '/usr/bin/g++')
      atom.config.set('linter-gcc-with-avr.gccDefaultCFlags', '-c -Wall -o /dev/null')
      atom.config.set('linter-gcc-with-avr.gccDefaultCppFlags', '-c -Wall -std=c++11 -o /dev/null')
      atom.config.set('linter-gcc-with-avr.gccErrorLimit', 15)
      atom.config.set('linter-gcc-with-avr.gccIncludePaths', ' ')
      atom.config.set('linter-gcc-with-avr.gccSuppressWarnings', true)
      atom.config.set('linter-gcc-with-avr.gccLintOnTheFly', false)
      atom.config.set('linter-gcc-with-avr.gccDebug', false)
      atom.config.set('linter-gcc-with-avr.gccErrorString', 'error')
      atom.config.set('linter-gcc-with-avr.gccWarningString', 'warning')
      atom.config.set('linter-gcc-with-avr.gccNoteString', 'note')
      atom.packages.activatePackage('language-c')
      return atom.packages.activatePackage('linter-gcc-with-avr')
    })
  })

  it('finds one error in error.cpp', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/error.cpp'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(1);
        })
      })
    })
  })

  it('finds no errors in comment.cpp', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/comment.cpp'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(0);
        })
      })
    })
  })

  it('finds one error in error.c', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/error.c'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(1);
        })
      })
    })
  })

  it('finds no errors in comment.c', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/comment.c'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(0);
        })
      })
    })
  })
})
