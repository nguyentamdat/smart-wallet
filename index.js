/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import MainView from "./src/components/SpendingPlan/MainView"
import RecordView from "./src/components/SpendingPlan/RecordView";

AppRegistry.registerComponent(appName, () => App);
