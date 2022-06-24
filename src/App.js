// import { Component } from "react";
import {  Route, Routes, BrowserRouter } from "react-router-dom";

import { NavbarComponents } from "./components";
import {Home, Sukses} from './pages'



function App() {
	return (
		<div>
        <NavbarComponents />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/sukses" element={<Sukses />}></Route>
					</Routes>
				</BrowserRouter>
		</div>
	);
}

// export default class App extends Component {
// 	render() {
// 	  return (
// 		<BrowserRouter>
// 			<NavbarComponents />
// 			<main>
// 			  <Switch>
// 				<Route  path="/" component={Home} exact/>
// 				<Route  path="/sukses" component={Sukses}/>
// 			  </Switch>
// 			</main>
// 		</BrowserRouter>
// 	  )
// 	}
//   }

export default App;