import {writeFile} from 'fs';

import {name, version} from './package.json';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   key: '${process.env.GOOGLE_CLOUD_API_KEY}'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});