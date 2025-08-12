import {name as appName} from './app.json';
import {AppRegistry, View} from 'react-native';
import App from './App';

const TOPIC = 'ERP';

const ERP = () => {
  return (
    <View style={{flex: 1}}>
      <App />
    </View>
  );
};

AppRegistry.registerComponent(appName, () => ERP);
