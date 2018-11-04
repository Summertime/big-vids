"use strict";

HTMLFormElement.prototype.toObject = function () {
    const obj = {};
    for (const el of this.elements)
        if (el.type === 'checkbox')
            obj[el.name] = el.checked;
    return obj;
}

options.addEventListener(
    'input',
    async function () {
        const opts = options.toObject();
        await browser.storage.local.set(opts);
    },
    {
        passive: true,
    },
);

(async () => {
    const opts = await browser.storage.local.get();
    for (const [key, val] of Object.entries(opts)) {
        const el = options.elements.namedItem(key);
        if (el.type === 'checkbox')
            el.checked = val
    }
})()
