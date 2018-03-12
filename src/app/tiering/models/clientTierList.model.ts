export interface ClientTierList {
    ParentId: number;
    ParentBusinessUnit: string;
    ParentAccountDirector: string;
    ParentName: string;
    ParentTier: string;
    IsNew: boolean;
    Children: {
        ClientId: number;
        ChildName: string;
        ParentId: number;
    };
}
