import { Transaction } from "../transaction/transaction";

export interface CategoryProps {
    id: string;
    name: string;
    useId: string;
    transactions: Transaction[];
}

export interface CategoryCreateProps {
    name: string;
    userId: string;
}

export class Category {
    private constructor(private readonly props: CategoryProps) {}

    public static create(props: CategoryCreateProps) {
        return new Category({
            id: crypto.randomUUID(),
            name: props.name,
            useId: props.userId,
            transactions: [],
        });
    }

    public static with(props: CategoryProps) {
        return new Category(props);
    }
}