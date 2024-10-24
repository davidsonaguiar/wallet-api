import { User } from "../user";

export interface IUserRepository {
    save: (input: User) => Promise<void>;
    findById: (input: string) => Promise<User>;
    findByEmail: (input: string) => Promise<User>;
    findAll: () => Promise<User[]>;
    update: (input: User) => Promise<void>;
    delete: (input: string) => Promise<void>;
}