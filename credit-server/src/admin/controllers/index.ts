import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import Admin from "../data-access";
import UserDatas from "../../auth/data-access";
import config from '../../../config.json'

export const AdminController = {

    login: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            const result = await Admin.AdminDB.findOne({ filter: { username: username } });
            console.log('....', password);
            console.log('db', result.password);
            if (result.username && password === result.password) {
                console.log('success')
                const tokenData = username;
                const token = jwt.sign({ username: tokenData }, config.JWT_SECRET, {
                    expiresIn: '1h'
                })
                return res.status(200).send({ status: true, token: token });
            }
            return res.status(200).send({ status: false });
        } catch (err) {
            console.log(err)
        }
    },
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            jwt.verify(token, config.JWT_SECRET, async (err, userData) => {
                if (err) {
                    return res.status(200).send({ message: err, status: false })
                }
                if (userData) {
                    const users = await UserDatas.UserDB.find({ filter: {} });

                    return res.status(200).send({ data: users, status: true });
                }
                return;
            })

        } catch (err) {
            return res.status(200).send({ message: err });
        }
    },
    setOption: async (req: Request, res: Response) => {
        try {

        } catch (err) {
            console.log(err)
        }
    }
}
