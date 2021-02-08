import { SAWEvent, SAWEventCallback } from './index';

const enum States {
    enabled,
    disabled,
}

let cb: SAWEventCallback;
SAWEvent.on(States.enabled, cb = function () {
    console.log('enabled, from id-1');
});

SAWEvent.on(States.enabled, function () {
    console.log('enabled, from id-2');
});

SAWEvent.on(States.enabled, function (data) {
    console.log('enabled, from id-3');
    console.log(`received data '${data}'`);
});

console.log('Event: enabled');
SAWEvent.set(States.enabled);

console.log('Event: enabled(data=cookie)');
SAWEvent.set(States.enabled, 'cookie');

console.log('Remove id-1 cb');
SAWEvent.off(States.enabled, cb);

console.log('Event: enabled(data=cookie2)');
SAWEvent.set(States.enabled, 'cookie2');

SAWEvent.on(States.disabled, async function (data) {
    console.log('disabled, from id-4(async)');
    console.log(`received data '${data}'`);
});

SAWEvent.on(States.disabled, function (data) {
    console.log('disabled, from id-5');
    console.log(`received data '${data}'`);
    console.log('break event');
    return false;
});

SAWEvent.on(States.disabled, function (data) {
    console.log('disabled, from id-6');
    console.log(`received data '${data}'`);
});

console.log('Event: disabled(data={data:cookie3})');
SAWEvent.set(States.disabled, { data: 'cookie3' });
