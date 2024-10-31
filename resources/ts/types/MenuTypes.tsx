export interface MenuInterface {
    id: string;
    title: string;
    parent_id: string | null;
    depth: number;
    created_at: string;
    updated_at: string;
    children: Array<MenuInterface>;
}

export interface MenuRequest {
    title: string;
    parent_id: string;
    dept: number;
}
