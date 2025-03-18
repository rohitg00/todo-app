import React from 'react';
import { ContentTabs } from '@teambit/community.ui.content-tabs';
import Env from './snippets/bit-env.mdx';
import Config from './snippets/config.mdx';

const content = [
  { title: 'my-env.bit-env.ts', body: <Env /> },
  { title: 'config/prettier.config.js', body: <Config /> },
];

export const PrettierExample = () => <ContentTabs tabsContent={content} />;
