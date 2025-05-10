import type { Events } from './types';
import { EventBus } from './core';

export { EventBus };

export const eventBus = new EventBus<Events>();
