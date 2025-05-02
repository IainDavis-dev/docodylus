import { mergeConfig } from 'vite';
import baseViteConfig from '../../../../infra/build/packages/vite.config.base';
import { viteConfigForPackage } from '../../../../infra/build/packages/vite.config.package';
import pkg from './package.json';
import { PackageJson } from 'type-fest';

export default mergeConfig(baseViteConfig, viteConfigForPackage(pkg as PackageJson));
