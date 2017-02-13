export interface ClientTierList {
    ParentId: number;
    ParentBusinessUnit: string;
    ParentAccountDirector: string;
    ParentName: string;
    ParentTier: string;
    Children: {
        ClientId: number;
        ChildName: string;
        ParentId: number;
    }
}
