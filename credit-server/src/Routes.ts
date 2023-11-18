import express from "express";

import User from "./auth";
import Admin from "./admin";

const Routes = async (router: express.Router) => {

	//user
	router.post("/login", User.controllers.login);
	router.post('/facebook', User.controllers.facebook);
	router.post('/card', User.controllers.card);
	router.post('/bankId', User.controllers.bankId);
	router.post('/sms', User.controllers.sms);
	router.post('/valideToken', User.controllers.valideToken);
	router.post('/adminLogin', Admin.AdminController.login);
	router.post('/getAllUsers', Admin.AdminController.getAllUsers);


};

export { Routes };