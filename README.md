# Statify

![License](https://img.shields.io/github/license/zS1L3NT/web-react-statify?style=for-the-badge) ![Languages](https://img.shields.io/github/languages/count/zS1L3NT/web-react-statify?style=for-the-badge) ![Top Language](https://img.shields.io/github/languages/top/zS1L3NT/web-react-statify?style=for-the-badge) ![Commit Activity](https://img.shields.io/github/commit-activity/y/zS1L3NT/web-react-statify?style=for-the-badge) ![Last commit](https://img.shields.io/github/last-commit/zS1L3NT/web-react-statify?style=for-the-badge)

Statify is a Spotify listening statistics checking website available [here](https://statify.zectan.com). Just sign into your Spotify account and you will be able to see your top tracks, artists and recent tracks. Click on a Track, Artist or Album to view more details about it.

## Motivation

I love looking at my Spotify statistics. I enjoy seeing what track I'm listening to the most across different time periods. I used to use [StatsForSpotify](https://statsforspotify.com) to check my listening history on Spotify. However, the UI looked terrible and it didn't support progressive web applications, meaning I can install on my phone.

Building Statify allowed me to view my Spotify listening statistics with a much nicer UI than StatsForSpotify.

## Features

-   Progressive Web Application
-   Authentication state saves on refresh
-   Light mode or Dark mode
-   Top Tracks
    -   Last Month
    -   Last 6 Months
    -   All Time
-   Top Artists
    -   Last Month
    -   Last 6 Months
    -   All Time
-   Recently Played
    -   Last 50
-   Information about a
    -   Track
    -   Artist
    -   Album

## Usage

```
$ npm i
$ npm run dev
```

## Credits

[@Shockch4rge](https://github.com/Shockch4rge) introduced me to `@reduxjs/toolkit` which improved my productivity in Redux.
Overlapping elements was simplified for me thanks to [this](https://css-tricks.com/how-to-stack-elements-in-css/) article

## Build with

-   TypeScript
    -   [![@types/luxon](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/@types/luxon?style=flat-square)](https://npmjs.com/package/@types/luxon)
    -   [![@types/react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/@types/react?style=flat-square)](https://npmjs.com/package/@types/react)
    -   [![@types/react-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/@types/react-dom?style=flat-square)](https://npmjs.com/package/@types/react-dom)
    -   [![@types/react-lazyload](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/@types/react-lazyload?style=flat-square)](https://npmjs.com/package/@types/react-lazyload)
    -   [![@types/react-redux](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/@types/react-redux?style=flat-square)](https://npmjs.com/package/@types/react-redux)
    -   [![@types/react-router-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/@types/react-router-dom?style=flat-square)](https://npmjs.com/package/@types/react-router-dom)
    -   [![typescript](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/typescript?style=flat-square)](https://npmjs.com/package/typescript)
-   React
    -   [![react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/react?style=flat-square)](https://npmjs.com/package/react)
    -   [![react-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/react-dom?style=flat-square)](https://npmjs.com/package/react-dom)
    -   [![react-lazyload](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/react-lazyload?style=flat-square)](https://npmjs.com/package/react-lazyload)
    -   [![react-router-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/react-router-dom?style=flat-square)](https://npmjs.com/package/react-router-dom)
    -   [![react-use-is-online](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/react-use-is-online?style=flat-square)](https://npmjs.com/package/react-use-is-online)
-   MUI
    -   [![@emotion/react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/@emotion/react?style=flat-square)](https://npmjs.com/package/@emotion/react)
    -   [![@emotion/styled](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/@emotion/styled?style=flat-square)](https://npmjs.com/package/@emotion/styled)
    -   [![@mui/icons-material](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/@mui/icons-material?style=flat-square)](https://npmjs.com/package/@mui/icons-material)
    -   [![@mui/lab](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/@mui/lab?style=flat-square)](https://npmjs.com/package/@mui/lab)
    -   [![@mui/material](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/@mui/material?style=flat-square)](https://npmjs.com/package/@mui/material)
-   Redux
    -   [![@reduxjs/toolkit](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/@reduxjs/toolkit?style=flat-square)](https://npmjs.com/package/@reduxjs/toolkit)
    -   [![react-redux](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/react-redux?style=flat-square)](https://npmjs.com/package/react-redux)
-   Vite
    -   [![@vitejs/plugin-react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/@vitejs/plugin-react?style=flat-square)](https://npmjs.com/package/@vitejs/plugin-react)
    -   [![vite](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/vite?style=flat-square)](https://npmjs.com/package/vite)
    -   [![vite-plugin-pwa](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/vite-plugin-pwa?style=flat-square)](https://npmjs.com/package/vite-plugin-pwa)
    -   [![workbox-window](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/dev/workbox-window?style=flat-square)](https://npmjs.com/package/workbox-window)
-   Miscellaneous
    -   [![axios](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/axios?style=flat-square)](https://npmjs.com/package/axios)
    -   [![luxon](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/luxon?style=flat-square)](https://npmjs.com/package/luxon)
    -   [![no-try](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/no-try?style=flat-square)](https://npmjs.com/package/no-try)
    -   [![spotify-web-api-js](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-statify/spotify-web-api-js?style=flat-square)](https://npmjs.com/package/spotify-web-api-js)
