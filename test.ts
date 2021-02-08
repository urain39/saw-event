import { SAWEvent, SAWEventCallback } from './index';

let callback1: SAWEventCallback;
SAWEvent.on('wakeUp', true, callback1 = function (data) {
    console.log(`Wake Up x1`);

    if (data !== void 0) {
        console.log(`Received data ${data}`);
    }
});

console.log(`Event: Wake Up!`);
SAWEvent.set('wakeUp', true);

// @ts-ignore
let callback2: SAWEventCallback;
SAWEvent.on('wakeUp', true, callback2 = function (data) {
    console.log(`Wake Up x2`);

    if (data !== void 0) {
        console.log(`Received data ${data}`);
    }
});

console.log(`Event: Wake Up!(send cookie)`);
SAWEvent.set('wakeUp', true, `Cookie`);

console.log(`Event: Remove callback1(wakeup1)`);
SAWEvent.off('wakeUp', true, callback1);

// @ts-ignore
let callback3: SAWEventCallback;
SAWEvent.on('wakeUp', true, callback3 = function (data) {
    console.log(`Wake Up x3`);

    if (data !== void 0) {
        console.log(`Received data ${data}`);
    }
});

console.log(`Event: Wake Up!`);
SAWEvent.set('wakeUp', true);

SAWEvent.on('wakeUp', false, function (data) {
    console.log(`Sleep x1`);

    if (data !== void 0) {
        console.log(`Received data ${data}`);
    }
});

let callback4: SAWEventCallback;
SAWEvent.on('wakeUp', false, callback4 = function (data) {
    console.log(`Sleep x2`);

    if (data !== void 0) {
        console.log(`Received data ${data}`);
    }
});

console.log(`Event: Sleep!`);
SAWEvent.set(`wakeUp`, false);

console.log(`Event: Remove callback4(sleep2)`);
SAWEvent.off('wakeUp', false, callback4);

console.log(`Event: Sleep!(send cookie2)`);
SAWEvent.set('wakeUp', false, `Cookie2`);

console.log(`Event: Clear`);
SAWEvent.clear();

console.log(`Event: Sleep!`);
SAWEvent.set('wakeUp', false, `Cookie2`);


SAWEvent.on('wakeUp', true, async function (data) {
    console.log('(Async)Wake Up x1')

    if (data) {
        console.log(`(Async)Received ${data}`);
    }
});


console.log(`Event: Wake Up!`);
SAWEvent.set('wakeUp', true);
