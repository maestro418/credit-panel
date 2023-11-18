import AdminModel from "../models";

const AdminDB = {
    create: async (data: any) => {
        const newData = new AdminModel.Admin(data);
        const saveData = await newData.save();
        if (!saveData) {
            throw new Error("UserDB Database Error");
        }
        return saveData;
    },
    findOne: async ({ filter }: { filter: any }) => {
        return AdminModel.Admin.findOne(filter);
    },
    find: async ({ filter }: { filter: any }) => {
        return AdminModel.Admin.find(filter);
    },
    update: async ({ filter, update }: { filter: any, update: any }) => {
        return AdminModel.Admin.findOneAndUpdate(
            filter,
            update
        );
    },
    remove: async ({ filter }: { filter: any }) => {
        const res: any = await AdminModel.Admin.deleteOne(filter);
        return {
            found: res.n,
            deleted: res.deletedCount
        };
    }
}

const Admin = {
    AdminDB
}
export default Admin;