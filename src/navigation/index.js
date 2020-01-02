import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../pages/Home';
import { DetailsScreen } from '../pages/Item';

// const HomeNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: DetailsScreen,
//   },
//   {
//     headerMode: 'none',
//     transitionConfig: () => ({
//       screenInterpolator: SlideFromRightIOS,
//     }),
//     gesturesEnabled: true,
//   },
// );

const HomeNavigator = createStackNavigator(
  { Home: HomeScreen, Details: DetailsScreen },
  {
    mode: 'card',
    navigationOptions: params => ({
      gesturesEnabled: true,
      gesturesDirection: 'inverted',
    }),
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const width = layout.initWidth;

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
          }),
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-width, 0, width],
              }),
            },
          ],
        };
      },
      // headerTitleInterpolator: sceneProps => {
      //   const { layout, position, scene } = sceneProps;
      //   const { index } = scene;

      //   return {
      //     opacity: position.interpolate({
      //       inputRange: [index - 1, index, index + 1],
      //       outputRange: [0, 1, 0],
      //     }),
      //     transform: [
      //       {
      //         translateX: position.interpolate({
      //           inputRange: [index - 1, index, index + 1],
      //           outputRange: [-50, 0, 50],
      //         }),
      //       },
      //     ],
      //   };
      // },
    }),
  },
);

export const AppNavigator = createAppContainer(HomeNavigator);
