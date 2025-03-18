import React from 'react';
import { ContentTabs } from '@teambit/community.ui.content-tabs';
import Env from './bit-env.mdx';
import Config from './config.mdx';
import TsConfig from './tsconfig.mdx';

const content = [
  { title: 'my-env.bit-env.ts', body: <Env /> },
  { title: 'config/eslintrc.js', body: <Config /> },
  { title: 'config/tsconfig.json', body: <TsConfig /> },
];

export const ESLintExample = () => <ContentTabs tabsContent={content} />;
