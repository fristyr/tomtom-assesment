Hi!
Welcome to my TomTom assesment.
My name is Dennis Goncearuc, and I want to introduce you to my project.

This project was build with [Expo](https://docs.expo.dev/) + [Expo EAS](https://expo.dev/eas)  for native modules.
Because it's Expo, you need some packages to run this project 

**npm i -g expo-cli** or **yarn global expo-cli**
and
**npm i -g eas-cli** or **yarn global eas-cli**

Then you need to install all packages, just use **yarn** from the root of the project
(P.S yarn is preferable)

To start the app you need to have an open Android or IOS simulator device
And then run **expo run:ios** or **expo run:android**
Wait untill finish, the eas cli will install development client and run the app for you.

The goal of this app was to make an application that lists POIs (Point of Interests like restaurants, parking stations etc.) around you.

Inside of the Android and IOS folders you can find custom native modules to implement network layer.
For Android I used: Java
For IOS I used: Swift

Usage of native modules can be fond here
**./app/hooks/react-query/useApiCall.ts**
Line 11

Comunication between network layer native modules and TomTom api was implement with React-Query 

Base hook to fetch data from TomTom API can be found here
**./app/hooks/react-query/appCalls/usePoiSearch.ts**

And UI screen to enter POI search and display list of search can be found here
**./app/screens/poi/poi.tsx**




