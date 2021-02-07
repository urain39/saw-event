type IMap<V> = {
    [index: number]: V;
    [key: string]: V;
};

type SAWEventKey = number | string;

type SAWEventValue = number | string | boolean | null;

/**
 * @param data 事件传递的数据
 */
export type SAWEventCallback = (data?: any) => any;

export class SAWEvent {
    private static _eventValueMap: IMap<SAWEventValue> = {};
    private static _eventCallbackMap: IMap<[SAWEventValue, SAWEventCallback][]> = {};

    /**
     * 添加一个事件监听器。
     * @param key 监听的键
     * @param value 想要的值
     * @param callback 当键对应的值达到想要的值时执行的回调
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
     * @param value 想要的值
     * @param callback 当键对应的值达到想要的值时执行的回调
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

        let callbacks = eventCallbackMap[key];
        if (callbacks) {
            for (const [wantedVaule, callback] of callbacks) {
                if (wantedVaule === value) {
                    callback(data);
                }
            }
        }
    }

    /**
     * 清除所有的记录数据。
     */
    public static clear(): void {
        this._eventCallbackMap = {};
        this._eventValueMap = {};
    }
}
