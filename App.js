import { createStackNavigator } from "react-navigation";
import Main from "./components/Main"
import List from "./components/List"
import Map from "./components/Map"


const App = createStackNavigator({
  s1: { screen: Main },
  s2: { screen: List },
  s3: { screen: Map },
});

export default App;