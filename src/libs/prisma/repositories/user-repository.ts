import { PrismaClient } from "@prisma/client";

import { IUserRepository } from "./../../../resources/user/protocols/user-repository.protocol";
import { User } from "../../../resources/user/user";

export class UserRepositoryPrisma implements IUserRepository {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): UserRepositoryPrisma {
        return new UserRepositoryPrisma(prismaClient);
    }

    public async save(input: User): Promise<void> {
        await this.prismaClient.user.create({
            data: {
                id: input.id,
                name: input.name,
                email: input.email,
                password: input.password,
            },
        });
    }

    public async findById(input: string): Promise<User | null> {
        const user = await this.prismaClient.user.findUnique({
            where: {
                id: input,
            },
        });
        if (!user) return null;
        return User.create(user);
    }

    public async findByEmail(input: string): Promise<User | null> {
        const user = await this.prismaClient.user.findUnique({
            where: {
                email: input,
            },
        });
        if (!user) return null;
        return User.create(user);
    }

    public async findAll(): Promise<User[]> {
        const users = await this.prismaClient.user.findMany();
        return users.map((user) => User.create(user));
    }

    public async update(input: User): Promise<void> {
        await this.prismaClient.user.update({
            where: {
                id: input.id,
            },
            data: {
                name: input.name,
                email: input.email,
                password: input.password,
            },
        });
    }

    public async delete(input: string): Promise<void> {
        await this.prismaClient.user.delete({
            where: {
                id: input,
            },
        });
    }
}
