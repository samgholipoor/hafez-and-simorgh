import osjs from 'osjs';
import { name as applicationName } from './metadata.json';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

const register = (core, args, options, metadata) => {
  const proc = core.make('osjs/application', { args, options, metadata });
  const win = proc.createWindow({
    id: 'SimorghWindow',
    title: core.make('osjs/locale').translatableFlat(proc.metadata.title),
    icon: proc.resource(metadata.icon),
    dimension: { width: 1024, height: 800 },
    position: { left: 200, top: 50 },
    attributes: {
      minDimension: { width: 1024, height: 800 },
      sessionable: true,
    },
  });

  win.on('render', () => {
    win.maximize();
    win.focus();
  });

  win.on('destroy', () => proc.destroy());

  win.render(($content) => {
    ReactDOM.render(<App core={core} win={win} proc={proc} />, $content);
  });
  return proc;
};

osjs.register(applicationName, register);
