import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import Home from "../pages/home";
import { CreateFood } from "../pages/CreateFood";
import  Profile  from "../pages/Profile";
import { FirstView } from "../FirstView";
import Saved from "../pages/Saved";


const AppRoutes = () => (
	<Router>
		<Routes>
			<Route path="/" element={<FirstView />} />
			<Route path="/user/register" element={<UserRegister />} />
			<Route path="/user/login" element={<UserLogin />} />
			<Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
			<Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
			<Route path="/home" element={<Home />} />
			<Route path="/createfood" element={<CreateFood />} />
			<Route path="/foodPartner/:id" element={<Profile/>} />
			<Route path="/saved" element={<Saved/>} />
		</Routes>
	</Router>
);

export default AppRoutes;
