import { Category } from "../category/category";

export interface TransactionProps {
    id: string;
    value: number;
    type: string;
    date: Date;
    description: string;
    accountBankId: string;
    categoryId?: string;
}

export interface TransactionCreateProps {
    value: number;
    type: string;
    date: Date;
    description: string;
    accountBankId: string;
}

export class Transaction {
    private constructor(private readonly props: TransactionProps) {}

    public static create(props: TransactionCreateProps) {
        return new Transaction({
            id: crypto.randomUUID(),
            value: props.value,
            type: props.type,
            date: props.date,
            description: props.description,
            accountBankId: props.accountBankId,
        });
    }

    public static with(props: TransactionProps) {
        return new Transaction(props);
    }
}