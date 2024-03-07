export interface IUserMe {
    _id?: string;
    first_name: string;
    last_name: string;
    age: number;
    role?: string;
    username?: string;
    password?: string;
    description: string;
    avatar?: string | undefined;
    total_guides?: number;
    todo_guides: number;
    read_guides: number;
}