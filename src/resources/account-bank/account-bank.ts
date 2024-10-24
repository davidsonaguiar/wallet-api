import { Transaction } from './../transaction/transaction';

export interface AccountBankProps {
    id: string;
    number: string;
    bank: string;
    saldo: number;
    transactions: Transaction[];
    userId: string;
}

export interface AccountBankCreateProps {
    number: string;
    bank: string;
    userId: string;
}

export class AccountBank {
    private constructor(private readonly props: AccountBankProps) {}

    public static create(props: AccountBankCreateProps) {
        return new AccountBank({
            id: crypto.randomUUID(),
            number: props.number,
            bank: props.bank,
            saldo: 0,
            transactions: [],
            userId: props.userId,
        });
    }

    public static with(props: AccountBankProps) {
        return new AccountBank(props);
    }
}