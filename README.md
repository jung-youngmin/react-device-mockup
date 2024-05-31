# react-device-mockup

![Static Badge](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react)
![Static Badge](https://img.shields.io/badge/demo-react--device--mockup-blue?style=for-the-badge&logo=createreactapp&link=https%3A%2F%2Fjung-youngmin.github.io%2Freact-device-mockup-demo%2F)

![GitHub Tag](https://img.shields.io/github/v/tag/jung-youngmin/react-device-mockup?include_prereleases&style=for-the-badge&logo=github&link=https%3A%2F%2Fgithub.com%2Fjung-youngmin%2Freact-device-mockup)
![NPM Version](https://img.shields.io/npm/v/react-device-mockup?style=for-the-badge&logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact-device-mockup)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/react-device-mockup?style=for-the-badge&logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact-device-mockup)

![Static Badge](https://img.shields.io/badge/repo-Github-black?style=for-the-badge&logo=github&link=https%3A%2F%2Fgithub.com%2Fjung-youngmin%2Freact-device-mockup)
![GitHub top language](https://img.shields.io/github/languages/top/jung-youngmin/react-device-mockup?style=for-the-badge&logo=Typescript)
![GitHub License](https://img.shields.io/github/license/jung-youngmin/react-device-mockup?style=for-the-badge&logo=github&link=https%3A%2F%2Fgithub.com%2Fjung-youngmin%2Freact-device-mockup)

You can check out the
[🌐 full-demo-here](https://jung-youngmin.github.io/react-device-mockup-demo/)  
Package for **React Native** is [🌐 here](https://github.com/jung-youngmin/react-native-device-mockup)

## Index

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [How to use](#how-to-use)
4. [Props](#props)
5. [Demo](#demo)
6. [License](#license)

## Introduction

`react-device-mockup` provides frame mockups for Android and iOS devices.  
You can use this library when you need a device demo for your app.  
**Every mockup is rendered as pure `div` tags.**

`react-device-mockup` provides the following mockups:

1. Android
   1. Phone: 19.5:9 aspect ratio, `AndroidMockup`
   2. Tablet: 16:10 aspect ratio, `AndroidTabMockup`
2. iOS
   1. iPhone, `IPhoneMockup`
      1. legacy iPhone: iPhone SE3
      2. notched iPhone: iPhone 14
      3. Dynamic island iPhone: iPhone 15 Pro
   2. iPad, `IPadMockup`
      1. legacy iPad 4:3 aspect ratio (home button)
      2. modern iPad: 4.3:3 aspect ratio (no home button)

## Installation

No dependencies. Just install it

``` bash
npm install react-device-mockup
```

or if you use yarn

``` bash
yarn add react-device-mockup
```

## How to use

``` tsx
import {
    AndroidMockup,
    AndroidTabMockup,
    IPhoneMockup,
    IPadMockup
}
from "react-device-mockup"


return (
  <>
    {/* Android Phone */}
    <AndroidMockup screenWidth={200}>
        {/* your demo */}
        <YourComponent>
          {...}
        </YourComponent>
    </AndroidMockup>

    {/* Android Tablet */}
    <AndroidTabMockup screenWidth={200}>
        {/* your demo */}
        <YourComponent>
          {...}
        </YourComponent>
    </AndroidTabMockup>

    {/* iPhone */}
    <IPhoneMockup screenWidth={200}>
        {/* your demo */}
        <YourComponent>
          {...}
        </YourComponent>
    </IPhoneMockup>

    {/* iPad */}
    <IPadMockup screenWidth={200}>
        {/* your demo */}
        <YourComponent>
          {...}
        </YourComponent>
    </IPadMockup>
  </>
)
```

## Props

### AndroidMockup & AndroidTabMockup

You can check [demo](#demo-android)

| prop               | Required | Type | Default | Description |
| ------------------ | :------: |----- | ------- | ----------- |
| screenWidth        | O        | `number` | | Width of mockup screen<br> [details](#screenwidth) |
| noRoundedScreen    | X        | `boolean` | `false` | Do not use rounded corners. |
| isLandscape        | X        | `boolean` | `false` | portrait or landscape<br>`false` means portrait |
| containerStlye     | X        | `ViewStyle` | | Styles for mockup container |
| frameColor         | X        | `ColorValue` | `"#666666"` | Color of Frame |
| frameOnly          | X        | `boolean` | `false` | Only the frame is shown.<br>Power button and volume buttons are hidden |
| statusbarColor     | X        | `ColorValue` | `"#CCCCCC"` | Color of status bar |
| hideStatusBar      | X        | `boolean`    | `false` | Hide the status bar<br>[details](#hidestatusbar) |
| navBar             | X        | `"swipe"`<br>`"bhr"`<br>`"rhb"` | `"swipe"` | Type of navigation bar<br>[details](#navbar) |
| navBarColor        | X        | `ColorValue` | `"#CCCCCC"` | Color of navigation bar |
| transparentNavBar  | X        | `boolean` | `false` | Make the navigation bar transparent.<br>[details](#transparentnavbar) |
| hideNavBar         | X        | `boolean` | `false` | Hide the navigation bar<br>[details](#hidenavbar) |
| transparentCamArea | X        | `boolean` | `false` | *NOTE: AndroidMockup only.*<br>Make the area around the camera transparent.<br>Only works when `isLandscape=true`.<br>[details](#transparentcamarea) |
| children           | X        | `ReactNode` |  | Components to be rendered on the mockup screen |

<br>

### IPhoneMockup & IPadMockup

You can check [demo](#demo-ios)

| prop  | Required | Type | Default | Description |
| ----- | :------: |----- | ------- | ----------- |
| screenWidth | O | `number` | | Width of mockup screen<br> [details](#screenwidth) |
| screenType | X | `"legacy"`<br>`"notch"`<br>`"island"` | `"island"` | *for IPhoneMokcup*<br>`"legacy"`: Classic iphone such as iPhone SE3<br>`"notch"`: Notched iPhone such as iPhone 14<br>`"island"`: Dynamic island iPhone such as iPhone 15 Pro |
| screenType | X | `"legacy"`<br>`"modern"` | `"modern"` | *for IPadMockup*<br>`"legacy"`: Classic iPad such as iPad 9th<br>`"modern"`: Modern iPad such as iPad Pro 13' |
| isLandscape | X | `boolean` | `false` | portrait or landscape<br>`false` means portrait |
| containerStlye | X | `ViewStyle` | | Styles for mockup container |
| frameColor | X | `ColorValue` | `"#666666"` | Color of Frame |
| frameOnly          | X        | `boolean` | `false` | Only the frame is shown.<br>Power button and volume buttons are hidden |
| statusbarColor | X | `ColorValue` | `"#CCCCCC"` | Color of status bar |
| hideStatusBar | X | `boolean` | `false` | Hide the status bar<br>[details](#hidestatusbar) |
| transparentNavBar | X | `boolean` | `false` | Make the navigation bar transparent.<br>[details](#transparentnavbar) |
| hideNavBar | X | `boolean` | `false` | Hide the navigation bar<br>[details](#hidenavbar) |
| children | X | `ReactNode` |  | Components to be rendered on the mockup screen |

#### screenWidth

Width of mockup screen.  
The height is automatically calculated according to the ratio.  
> **NOTE**  
> It does not mean the full width of the mockup being rendered.

<br>

#### hideStatusBar

Hide the status bar.

- `false`: Status bar occupies its own space with `statusbarColor`. (default)
- `true`: Status bar no longer occupies its own area, but becomes part of the screen area.

> **NOTE**  
> When `isLandscape=true` and `screenType="legacy"` in `iPhoneMockup`,  
> the status bar is always hidden regardless of `hideStatusBar`.  
> Even on the REAL classic iPhone, the status bar is always hidden when in landscape mode.

<br>

#### navBar

Type of navigation bar.

- `"swipe"`: swipe gesture navigation bar. (modern style)
- `"bhr"`: back-home-recent buttons. (classic style)
- `"rhb"`: recent-home-back. (classic style)

> This prop is only for  
> `AndroidMockup`, `AndroidTabMockup`

<br>

#### transparentNavBar

Make the navigation bar transparent.

- `false`: Navigation bar occupies its own space with `navBarColor`. (default)
- `true`: Navigation bar no longer occupies its own area, but becomes part of the screen area.
  - **NOTE:** Swipe bar or buttons are rendered according to the type specified by `navBar` props.

> **NOTE**  
> When `screenType="legacy"` in `iPhoneMockup`, `transparentNavBar` is always ignored.

<br>

#### hideNavBar

Hide the navigation bar.  

- `false`: Show the navigation bar. (default)
- `true`: Hide the navigation bar.
  - Navigation bar no longer occupies its own area,  
    but becomes part of the screen area.
  - **NOTE:** Swipe bar or buttons are **NOT** rendered according to the type specified by `navBar` props.

> **NOTE**  
> When `screenType="legacy"` in `iPhoneMockup`, `hideNavBar` is always ignored.

<br>

#### transparentCamArea

*AndroidMockup only.*  
Make the area around the camera transparent.  
It only works when `isLandscape=true`.  
It is ignored when `isLandscape=false`
> **CamArea** (Camera area)  
> The part that was the status bar when in Portrait.  
> When in Landscape, in Android Native, this part is simply expressed as an empty (blank) area.
>
> This prop is **only for**  
> `AndroidMockup`

<br>

## Demo

### [🌐 full-demo](https://jung-youngmin.github.io/react-device-mockup-demo/)

### Demo: Android

- `AndroidMockup`
- `AndroidTabMockup`

#### `AndroidMockup` default mockups

| isLandscape=false | isLandscape=true |
| :--: | :--: |
|![and_default](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/7551489e-54f6-4832-814c-bdd35ae012b5) | ![and_default_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/49c5fa90-e2cb-4b14-a860-9ea0349a52ab) |

#### `AndroidTabMockup` default mockups

| isLandscape=false | isLandscape=true |
| :--: | :--: |
| ![and_tab](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/3a9f8191-0b5d-4a9e-907f-1b5d5eb60274) | ![and_tab_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/7f5a4f97-2736-4578-a993-d61567c674f6) |

#### hideStatusBar & hideNavBar

``` tsx
hideStatusBar={true}
hideNavBar={true}
```

| isLandscape=false | isLandscape=true |
| :--: | :--: |
| ![and_all_hide](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/dec76fdc-7dc3-42ac-bf68-d8e8a0ddc8d2) | ![and_all_hide_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/c49dfead-ae26-449a-8ab8-e79bfb92608f) |

#### other props

| noRoundedScreen | frameColor="green"<br>statusbarColor="red"<br>navBarColor="blue" |
| :--: | :--: |
| ![and_noRoundedScreen](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/9ded37e1-edff-43df-a10a-864e7dd4437c) | ![and_colors](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/32de0f9d-f687-4d6d-8ab2-40f08b54fbfa) |

#### default with child

| isLandscape=false | isLandscape=true |
| :--: | :--: |
| ![and_default_child](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/1ffaf363-c1f4-4818-a86d-145030c86ef5) | ![and_land_default_child](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/3ebc05a9-59ce-4a30-98fe-e32f8b8c8eb5) |

#### props.hideStatusBar

| isLandscape=false | isLandscape=true |
| :--: | :--: |
| ![hidestatusbar](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/96c368c4-838a-4c01-ba48-55279ddfdc44) | ![hidestatusbar_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/bb9f836e-223e-4796-997e-aa71b2e2968d) |

#### props.transparentNavBar

| isLandscape=false | isLandscape=true |
| :--: | :--: |
| ![trans_navi](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/0dd9a206-4e72-413a-8249-eb359d66eba3)<br>`navBar="bhr"` | ![trans_navi_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/70485119-4b85-4517-9290-1242023ba19b)<br>`navBar="bhr"` |

#### props.hideNavBar

| isLandscape=false | isLandscape=true |
| :--: | :--: |
| ![hide_navi](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/8a8330d1-ca94-494e-b55d-af797dcdcfbe) | ![hide_navi_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/13612fe4-d8d2-4589-a6a0-3643ecd37a76) |

#### props.transparentCamArea

AndroidMockup, landscape only
| isLandscape=false | isLandscape=true |
| :--: | :--: |
| none | ![transparentCamArea](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/3ed9eba5-758e-46b2-828d-5381015789d0) |

### Demo: iOS

- `IPhoneMockup`
- `IPadMockup`

#### IPhoneMockup

All props not mentioned are default.  
Props with the same name as props in `AnroidMockup` work the same way.

| screenType | isLandscape=false | isLandscape=true |
| :--: | :--: | :--: |
| `"island"` | ![iphone_island](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/7e03f344-b3d6-4c8f-a475-f7c274b5d960) | ![iphone_island_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/b6aece2d-8281-421d-8db8-aece4ee8f195) |
| `"notch"` | ![iphone_notch](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/4fae505b-27f1-4cb7-b26f-ef1560a428d0) | ![iphone_notch_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/740c7ebc-bdb2-4551-a722-512e6ea3fe7f) |
| `"legacy"` | ![iphone_legacy](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/9491b288-3e3d-4fbe-bc9c-fcf094122579) | ![iphone_legacy_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/7edac478-2292-47c2-9deb-4c43b276273d) |

#### IPadMockup

All props not mentioned are default.  
Props with the same name as props in `AnroidMockup` work the same way.

| screenType | isLandscape=false | isLandscape=true |
| :--: | :--: | :--: |
| `"modern"` | ![ipad_modern](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/d401ac58-610d-4972-9eaa-72ced22052d8) | ![ipad_modern_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/c02f665c-7f18-4d52-ace7-633bc961a2f9) |
| `"legacy"` | ![ipad_legacy](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/6fd14a02-b697-438f-b825-38503e022b62) | ![ipad_legacy_land](https://github.com/jung-youngmin/react-native-device-mockup/assets/166787291/392facc6-b17b-43fc-aace-b48b0cf5d4b1) |

## License

MIT license
