//
// This is the client bootstrapping script.
// This is where you can register service providers or set up
// your libraries etc.
//
// https://manual.os-js.org/guide/provider/
// https://manual.os-js.org/install/
// https://manual.os-js.org/resource/official/
//

import {
  Core,
  CoreServiceProvider,
  DesktopServiceProvider,
  VFSServiceProvider,
  NotificationServiceProvider,
  SettingsServiceProvider,
  AuthServiceProvider,
} from '@osjs/client';

import {PanelServiceProvider} from '@osjs/panels';
import {GUIServiceProvider} from '@osjs/gui';
import {DialogServiceProvider} from '@osjs/dialogs';
import config from './config.js';
import './index.scss';

const init = () => {
  const osjs = new Core(config, {});

  // Register your service providers
  osjs.register(CoreServiceProvider);
  osjs.register(DesktopServiceProvider);
  osjs.register(VFSServiceProvider);
  osjs.register(NotificationServiceProvider);
  osjs.register(SettingsServiceProvider, {before: true});
  osjs.register(AuthServiceProvider, {before: true});
  osjs.register(PanelServiceProvider);
  osjs.register(DialogServiceProvider);
  osjs.register(GUIServiceProvider);

  osjs.on('osjs/core:started', ()=>{
    osjs.make('osjs/tray', {
      title: 'Full Screen',
      icon: osjs.make('osjs/theme').icon('view-fullscreen'),
      onclick: ev => (!document.fullscreenElement) ? openFullscreen() : closeFullscreen()
    });
  });

  let elem = document.documentElement;
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }
  //toggle language between english and persian
  osjs.on('osjs/core:started', () =>
    osjs.make('osjs/tray', {
      title: 'Language',
      icon: osjs.make('osjs/theme').icon('preferences-desktop-locale'),
      onclick: async (ev) => {
        const lang = await osjs.make('osjs/locale').getLocale();
        if (lang === 'fa_FA') {
          await osjs.make('osjs/locale').setLocale('en_EN');
          document.location.reload();
        } else if (lang.match(/^en/)) {
          await osjs.make('osjs/locale').setLocale('fa_FA');
          document.location.reload();
        }
      },
    })
  );

  osjs.boot();
};

window.addEventListener('DOMContentLoaded', () => init());
