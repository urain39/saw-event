type IMap<V> = {
    [index: number]: V;
    [key: string]: V;
};

type SAWEventType = number | string;

/**
 * 事件对应的回调。返回`false`可以阻止事件往后传播。
 * @param data 事件传递的数据
 */
export type SAWEventCallback = (data?: any) => void | boolean | Promise<void>;

export class SAWEvent {
    private static _eventCallbackMap: IMap<SAWEventCallback[]> = {};

    /**
     * 添加一个事件监听器。注意：我们只是接受异步函数作为参数传入，但是我们
     * 并不关心异步函数的执行状态与结果。因为异步函数的执行顺序是不可预测的。
     * @param event 监听的事件
     * @param callback 当事件发生时执行的回调
     */
    public static on(event: SAWEventType, callback: SAWEventCallback): void {
        const eventCallbackMap = this._eventCallbackMap;

        let callbacks = eventCallbackMap[event];
        if (!callbacks) {
            eventCallbackMap[event] = callbacks = [];
        }

        callbacks.push(callback);
    }

    /**
     * 移除一个事件监听器。
     * @param event 监听的事件
     * @param callback 当事件发生时执行的回调
     */
    public static off(event: SAWEventType, callback: SAWEventCallback): void {
        const eventCallbackMap = this._eventCallbackMap;
        const callbacks = eventCallbackMap[event];

        if (callbacks) {
            for (let i = 0, l = callbacks.length; i < l; i++) {
                const callback_ = callbacks[i];
                if (callback_ === callback) {
                    callbacks.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * 触发一个事件，并执行相关的回调。
     * @param event 与监听器对应的事件
     * @param data 发送给回调的数据
     */
    public static set(event: SAWEventType, data?: any): void {
        const eventCallbackMap = this._eventCallbackMap;
        const callbacks = eventCallbackMap[event];

        if (callbacks) {
            for (const callback of callbacks) {
                if (callback(data) === false) {
                    break;
                }
            }
        }
    }

    /**
     * 清除所有记录的数据。
     */
    public static clear(): void {
        this._eventCallbackMap = {};
    }
}
