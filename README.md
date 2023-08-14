# Super Mission Stats Viewer
 A simple viewer for the Super Mission Stats mod for DRG ([GitHub](https://github.com/RubenHuizenga/SuperMissionStats) | [Mod page](https://mod.io/g/drg/m/super-mission-stats))

 ### This is still an early version, improvements will be made

 To use the app, first make sure you have the mod installed. When you open the app, input the directory where the files are saved. This should be `[Deep Rock Galactic folder]\FSD\Mods\SuperMissionStats\`. Then, press the refresh button twice to start, and once after every played mission to load in the new stats.

 In the overview you can see all your missions with their stats. Click on them to expand them and see more.

 If you have any tips, feel free to let me know. This is my first time using most of the technologies used in this app, so any feedback is always appreciated.

 ## Testing and Building
 To test and build the app yourself, run `npm run tauri dev` or `npm run tauri build` respectively. When testing there should open a window which refreshes automatically when you make any changes and when building a release, the result can be found in `super-mission-stats-viewer\src-tauri\target\release`
