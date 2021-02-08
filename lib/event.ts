type IMap<V> = {
    [index: number]: V;
    [key: string]: V;
};

type SAWEventKey = number | string;

type SAWEventValue = number | string | boolean | null;

/**
 * 事件对应的回调。返回`false`可以阻止事件往后传播。
 * @param data 事件传递的数据
 */
export type SAWEventCallback = (data?: any) => void | boolean | Promise<void>;

export class SAWEvent {
    private static _eventValueMap: IMap<SAWEventValue> = {};
    private static _eventCallbackMap: IMap<[SAWEventValue, SAWEventCallback][]> = {};

    /**
     * 添加一个事件监听器。注意：我们只是接受异步函数作为参数传入，但是我们
     * 并不关心异步函数的执行状态与结果。因为异步函数的执行顺序是不可预测的。
     * @param key 监听的键
     * @param value 希望的值
     * @param callback 当键对应的值达到希望的值时执行的回调
     */
    public static on(key: SAWEventKey, value: SAWEventValue, callback: SAWEventCallback): void {
        const eventCallbackMap = this._eventCallbackMap;

        let callbacks = eventCallbackMap[key];
        if (!callbacks) {
            eventCallbackMap[key] = callbacks = [];
        }

        callbacks.push([value, callback]);
    }

    /**
     * 移除一个事件监听器。
     * @param key 监听的键
     * @param value 希望的值
     * @param callback 当键对应的值达到希望的值时执行的回调
     */
    public static off(key: SAWEventKey, value: SAWEventValue, callback: SAWEventCallback): void {
        const eventCallbackMap = this._eventCallbackMap;
        const callbacks = eventCallbackMap[key];

        if (callbacks) {
            for (let i = 0, l = callbacks.length; i < l; i++) {
                const [vaule_, callback_] = callbacks[i];
                if (vaule_ === value && callback_ === callback) {
                    callbacks.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * 设置一个键值，并执行相关的回调。
     * @param key 与监听器对应的键
     * @param value 键对应的值
     * @param data 发送给回调的数据
     */
    public static set(key: SAWEventKey, value: SAWEventValue, data?: any): void {
        const eventValueMap = this._eventValueMap;

        eventValueMap[key] = value;

        const eventCallbackMap = this._eventCallbackMap;
        const callbacks = eventCallbackMap[key];

        if (callbacks) {
            for (const [wantedVaule, callback] of callbacks) {
                if (wantedVaule === value) {
                    if (callback(data) === false) {
                        break;
                    }
                }
            }
        }
    }

    /**
     * 清除所有记录的数据。
     */
    public static clear(): void {
        this._eventValueMap = {};
        this._eventCallbackMap = {};
    }
}
