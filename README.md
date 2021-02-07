SAW-Event
===========

一个类似于安卓 RC 脚本的事件处理实现。

使用方法
```ts
import { SAWEvent } from './index';

// SAWEvent.on(key, value, callback);
// SAWEvent.off(key, value, callback);
// SAWEvent.set(key, value[, data]);

// 添加当`initialized`为`true`时的处理
SAWEvent.on('initialized', true, function (data) {
    if (data) {
        // TODO: ...
    }
});

// 添加当`initialized`为`false`时的处理
SAWEvent.on('initilaized', false, function (data) {
    // 改变当前状态
    SAWEvent.set('initialized', true, { message: 'Initialized!' });
});

// 设置当前状态
SAWEvent.set('initialized', false);
```
