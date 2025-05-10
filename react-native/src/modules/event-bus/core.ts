type EventHandler<T = unknown> = (data: T) => void;
type HandlerWithPriority<T = unknown> = {
  handler: EventHandler<T>;
  priority: number;
};

type Events = {
  [key: string]: unknown;
};

export class EventBus<E extends Events, N extends keyof E = keyof E> {
  private events: Map<N, Set<HandlerWithPriority>>;

  constructor() {
    this.events = new Map();
  }

  /** 订阅事件 */
  on<T extends N>(event: T, handler: EventHandler<E[T]>, priority: number = 0) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add({ handler, priority } as HandlerWithPriority);

    return () => this.off(event, handler);
  }

  /** 取消订阅事件 */
  off<T extends N>(event: T, handler: EventHandler<E[T]>): void {
    if (!this.events.has(event)) return;

    const handlers = this.events.get(event)!;
    for (const handlerWithPriority of handlers) {
      if (handlerWithPriority.handler === handler) {
        handlers.delete(handlerWithPriority);
        break;
      }
    }
  }

  /** 订阅一次性事件 */
  once<T extends N>(event: T, handler: EventHandler<E[T]>, priority: number = 0): void {
    const onceHandler: EventHandler<E[T]> = (data: E[T]) => {
      handler(data);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler, priority);
  }

  /** 只注册第一个事件，忽略后续注册 */
  onSingle<T extends N>(event: T, handler: EventHandler<E[T]>): void {
    const ev = this.events.get(event);
    if (ev && ev.size > 0) {
      return; // 如果事件已经有注册的处理器，则忽略
    }
    this.on(event, handler);
  }

  /** 发布事件 */
  async emit<T extends N>(event: T, data?: E[T]) {
    if (!this.events.has(event)) return;

    const handlers = Array.from(this.events.get(event)!);
    // 按优先级排序
    handlers.sort((a, b) => b.priority - a.priority);
    await Promise.all(handlers.map(({ handler }) => handler(data)));
  }

  /** 清除所有事件 */
  cleanUp() {
    this.events.clear();
  }
}
