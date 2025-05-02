// eslint-disable-next-line import/no-extraneous-dependencies
import { glob } from 'glob';

const getPackageJsonDirectories = () => {
  const filePaths = [
    '.', // root package.json path
    ...glob
      .sync('src/**/package.json', { absolute: false })
      .map((filePath) => filePath.replace('/package.json', '')),
  ];

  return [...filePaths];
};

const getNpmPluginConfigs = () => {
  const npmPluginConfigs = getPackageJsonDirectories().map((dirPath) => [
    '@semantic-release/npm',
    { npmPublish: false, pkgRoot: dirPath },
  ]);

  return npmPluginConfigs;
};

export default {
  branches: [
    'main',
    { name: 'prerelease', prerelease: 'prerelease' },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ...getNpmPluginConfigs(),
    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
          'src/**/package.json',
          'CHANGELOG.md',
        ],
        // eslint-disable-next-line no-template-curly-in-string
        message: 'chore(release): 🚀 version ${nextRelease.version} [skip ci]',
      },
    ],
  ],
};
