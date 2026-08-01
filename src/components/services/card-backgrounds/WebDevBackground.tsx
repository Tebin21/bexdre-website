import type React from 'react';
import { CardBackground } from './CardBackground';
import { CodeSceneBackground } from './webdev/CodeSceneBackground';

export const WebDevBackground: React.FC = () => (
  <CardBackground>
    <CodeSceneBackground />
  </CardBackground>
);
