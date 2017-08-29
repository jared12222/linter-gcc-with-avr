'use babel';

import LinterGccWithAvrView from './linter-gcc-with-avr-view';
import { CompositeDisposable } from 'atom';

export default {

  linterGccWithAvrView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.linterGccWithAvrView = new LinterGccWithAvrView(state.linterGccWithAvrViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.linterGccWithAvrView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'linter-gcc-with-avr:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.linterGccWithAvrView.destroy();
  },

  serialize() {
    return {
      linterGccWithAvrViewState: this.linterGccWithAvrView.serialize()
    };
  },

  toggle() {
    console.log('LinterGccWithAvr was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
