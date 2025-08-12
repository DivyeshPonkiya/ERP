import Reactotron, {
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
const reactotron = Reactotron.configure({
  name: 'ERP',
}) // controls connection & communication settings
  // .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .useReactNative()
  // .use(openInEditor())
  // .use(trackGlobalErrors()) // add all built-in react native plugins
  .use(reactotronRedux()) //use the reactotron redux plugin
  .connect(); // let's connect!

Reactotron.clear();

console.tron = Reactotron;

export default reactotron;
