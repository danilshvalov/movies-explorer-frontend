import {CracoAliasPlugin, configPaths} from 'react-app-rewire-alias';

// eslint-disable-next-line import/prefer-default-export
export const plugins = [
  {
    plugin: CracoAliasPlugin,
    options: {alias: configPaths('./tsconfig.paths.json')},
  },
];
