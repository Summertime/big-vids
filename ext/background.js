"use strict";
let options = {};
// load vars from last session, correctness isn't needed much
(async () => options = await browser.storage.local.get())()

browser.storage.onChanged.addListener((obj) => {
    for (const [key, { newValue }] of Object.entries(obj))
        options[key] = newValue;
});


browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const url = new URL(details.url);
        if (url.pathname !== '/watch')
            return;
        if (!url.searchParams.has('v'))
            return;
        const video_id = url.searchParams.get('v');
        const redirect = new URL(video_id, 'https://www.youtube.com/embed/');
        url.searchParams.delete('v');
        if (options.autoplay)
            url.searchParams.set('autoplay', '1');
        redirect.search = url.search;
        return { redirectUrl: redirect.href };
    },
    {
        urls: [
            'https://www.youtube.com/*',
        ],
        types: [
            'main_frame',
        ],
    },
    [
        'blocking',
    ],
);
