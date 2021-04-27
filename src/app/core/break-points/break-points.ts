/*
https://github.com/angular/flex-layout/wiki/Responsive-API
breakpoint	mediaQuery
xs	'screen and (max-width: 599px)'
sm	'screen and (min-width: 600px) and (max-width: 959px)'
md	'screen and (min-width: 960px) and (max-width: 1279px)'
lg	'screen and (min-width: 1280px) and (max-width: 1919px)'
xl	'screen and (min-width: 1920px) and (max-width: 5000px)'
lt-sm	'screen and (max-width: 599px)'
lt-md	'screen and (max-width: 959px)'
lt-lg	'screen and (max-width: 1279px)'
lt-xl	'screen and (max-width: 1919px)'
gt-xs	'screen and (min-width: 600px)'
gt-sm	'screen and (min-width: 960px)'
gt-md	'screen and (min-width: 1280px)'
gt-lg	'screen and (min-width: 1920px)'

ZURB's XY GRID BREAKPOINTS:
  xsmall:   0 - 599px
  small:    600px - 959px,
  medium:   960px - 1279px,
  large:    1280px - 1919px,
  xlarge:   1920px - 2499px,
  xxlarge:  2500px & up
*/

// isLandscape: boolean;
export const BREAKPOINT_LANDSCAPE =
  [{
    alias: 'landscape',
    suffix: 'landscape',
    mediaQuery: '(orientation: landscape)',
    overlapping: false
  }];

// isPortrait: boolean;
export const BREAKPOINT_PORTRAIT =
  [{
    alias: 'portrait',
    suffix: 'portrait',
    mediaQuery: '(orientation: portrait)',
    overlapping: false
  }];

// isRetina2: boolean;
export const BREAKPOINT_RETINA2 =
  [{
    alias: 'retina2',
    suffix: 'retina2',
    mediaQuery: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
    overlapping: false
  }];

// isRetina3: boolean;
export const BREAKPOINT_RETINA3 =
  [{
    alias: 'retina3',
    suffix: 'retina3',
    mediaQuery: '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 192dpi)',
    overlapping: false
  }];

// isStandalone: boolean;
export const BREAKPOINT_STANDALONE =
  [{
    alias: 'standalone',
    suffix: 'standalone',
    mediaQuery: '(display-mode: standalone)',
    overlapping: false
  }];
