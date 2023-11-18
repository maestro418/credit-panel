import UserModels from "../models";

const UserDB = {
    create: async (data: any) => {
        const newData = new UserModels.Users(data);
        const saveData = await newData.save();
        if (!saveData) {
            throw new Error("UserDB Database Error");
        }
        return saveData;
    },
    findOne: async ({ filter }: { filter: any }) => {
        return UserModels.Users.findOne(filter);
    },
    find: async ({ filter }: { filter: any }) => {
        return UserModels.Users.find(filter);
    },
    update: async ({ filter, update }: { filter: any, update: any }) => {
        return UserModels.Users.findOneAndUpdate(
            filter,
            update
        );
    },
    remove: async ({ filter }: { filter: any }) => {
        const res: any = await UserModels.Users.deleteOne(filter);
        return {
            found: res.n,
            deleted: res.deletedCount
        };
    }
}

const UserDatas = {
    UserDB
}
export default UserDatas;