import { AccountBank } from "../account-bank/account-bank";
import { Category } from "../category/category";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    accountsBank: AccountBank[];
    categories: Category[];
}

export interface UserCreateProps {
    name: string;
    email: string;
    password: string;
}

export class User {
    private constructor(private readonly props: UserProps) {}

    public static create(props: UserCreateProps) {
        return new User({
            id: crypto.randomUUID(),
            name: props.name,
            email: props.email,
            password: props.password,
            accountsBank: [],
            categories: [],
        });
    }

    public static with(props: UserProps) {
        return new User(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get email() {
        return this.props.email;
    }

    public get password() {
        return this.props.password;
    }
}
