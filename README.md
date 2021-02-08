SAW-Event
===========

一个简单的事件处理实现。

使用方法
```ts
import { SAWEvent } from './index';

// SAWEvent.on(key, callback);
// SAWEvent.off(key, callback);
// SAWEvent.set(key[, data]);

// 添加当`initialized`时的处理
SAWEvent.on('initialized', function (data) {
    if (data) {
        // TODO: ...
    }

    // 返回`false`可以阻止事件往后传播。
    // return false;
});

// 设置当前状态，并传递一个`null`
SAWEvent.set('initialized', null);
```
