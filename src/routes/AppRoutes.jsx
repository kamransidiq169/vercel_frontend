import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import { CreateFood } from "../pages/CreateFood";
import  Profile  from "../pages/Profile";
import { FirstView } from "../FirstView";
import Saved from "../pages/Saved";
import { Home } from "../pages/home";



const AppRoutes = () => (
	<Router>
		<Routes>
			<Route path="/" element={<FirstView />} />
			<Route path="/user/register" element={<UserRegister />} />
			<Route path="/user/login" element={<UserLogin />} />
			<Route path="/fooduser/register" element={<FoodPartnerRegister />} />
			<Route path="/fooduser/login" element={<FoodPartnerLogin />} />
			<Route path="/Home" element={<Home />} />
			<Route path="/createfood" element={<CreateFood />} />
			<Route path="/foodPartner/:id" element={<Profile/>} />
			<Route path="/saved" element={<Saved/>} />
		</Routes>
	</Router>
);

export default AppRoutes;
