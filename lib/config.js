'use strict';

var path = require('path');
var fs = require('fs');

module.exports.niceName = 'Custom file (.gcc-flags.json)';

module.exports.settings = function () {

  var SETTINGS_FILENAME = ".gcc-flags.json";
  var MAX_ITERATIONS = 30;

  var file_settings = atom.workspace.getActiveTextEditor().getPath() + SETTINGS_FILENAME;
  var directory_settings = path.join(path.dirname(file_settings), SETTINGS_FILENAME);
  var config_file = "";

  if (fs.existsSync(file_settings)) {
      config_file = file_settings;
  } else if (fs.existsSync(directory_settings)) {
      config_file = directory_settings;
  }

  if (config_file == "" && atom.project.getPaths()[0] != undefined) {
      var project_path = atom.project.getPaths()[0];
      var current_path = path.dirname(file_settings);
      var current_file = "";
      var counter = 0;
      while (path.relative(current_path, project_path) != "" && counter < MAX_ITERATIONS){
          current_path = path.join(current_path, "..");
          current_file = path.join(current_path, SETTINGS_FILENAME);
          if (fs.existsSync(current_file)) {
              config_file = current_file;
              break;
          }
          counter += 1;
      }
  }

  if (atom.config.get("linter-gcc-with-avr.gccDebug")){
    if (config_file.length > 0) {
      console.log("linter-gcc-with-avr: Reading settings from: " + config_file);
    } else {
      console.log("linter-gcc-with-avr: Using configuration page settings");
    }
  }
  var commands_file = ""
  if (config_file != "") {
      delete require.cache[config_file];
      var config_data = require(config_file);
      if ("compileCommandsFile" in config_data) {
        commands_file = config_data.compileCommandsFile;
      } else {
        commands_file = atom.config.get("linter-gcc-with-avr.compileCommandsFile");
      }
      return {
        execPath: config_data.execPath,
        gccIncludePaths: config_data.gccIncludePaths,
        gccSuppressWarnings: config_data.gccSuppressWarnings,
        gccDefaultCFlags: config_data.gccDefaultCFlags,
        gccDefaultCppFlags: config_data.gccDefaultCppFlags,
        gccErrorLimit: config_data.gccErrorLimit,
        gccErrorString: config_data.gccErrorString,
        gccWarningString: config_data.gccWarningString,
        gccNoteString: config_data.gccNoteString,
        compileCommandsFile: commands_file,
        exeAvrcPath: config_data.exeAvrcPath,
        avrDevice: config_data.avrDevice,
        avrDeviceFrequency: config_data.avrDeviceFrequency,
        avrgccDefaultCFlags: config_data.avrgccDefaultCFlags,
        avrcMode: config_data.avrcMode,
      };
  } else {
      return {
          execPath: atom.config.get("linter-gcc-with-avr.execPath"),
          gccIncludePaths: atom.config.get("linter-gcc-with-avr.gccIncludePaths"),
          gccSuppressWarnings: atom.config.get("linter-gcc-with-avr.gccSuppressWarnings"),
          gccDefaultCFlags: atom.config.get("linter-gcc-with-avr.gccDefaultCFlags"),
          gccDefaultCppFlags: atom.config.get("linter-gcc-with-avr.gccDefaultCppFlags"),
          gccErrorLimit: atom.config.get("linter-gcc-with-avr.gccErrorLimit"),
          gccErrorString: atom.config.get("linter-gcc-with-avr.gccErrorString"),
          gccWarningString: atom.config.get("linter-gcc-with-avr.gccWarningString"),
          gccNoteString: atom.config.get("linter-gcc-with-avr.gccNoteString"),
          compileCommandsFile: atom.config.get("linter-gcc-with-avr.compileCommandsFile"),
          exeAvrcPath: atom.config.get("linter-gcc-with-avr.exeAvrcPath"),
          avrDevice: atom.config.get("linter-gcc-with-avr.avrDevice"),
          avrDeviceFrequency: atom.config.get("linter-gcc-with-avr.avrDeviceFrequency"),
          avrgccDefaultCFlags: atom.config.get("linter-gcc-with-avr.avrgccDefaultCFlags"),
          avrcMode: atom.config.get("linter-gcc-with-avr.avrcMode"),
      };
  }

};
