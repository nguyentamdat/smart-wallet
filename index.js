/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import MainView from './components/MainView'
import RecordView from './components/RecordView'

AppRegistry.registerComponent(appName, () => RecordView);
