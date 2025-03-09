module.exports = {
  branches: [
    'main',
    { name: 'prerelease', prerelease: 'prerelease' },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
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
