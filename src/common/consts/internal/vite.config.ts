import { mergeConfig } from 'vite';
import baseViteConfig from '../../../../infra/build/vite.config.base';
import { viteConfigForPackage } from '../../../../infra/build/vite.config.package';
import pkg from './package.json';
import { PackageJson } from 'type-fest';

export default mergeConfig(baseViteConfig, viteConfigForPackage(pkg as PackageJson));
