declare module "next-auth" {
    export interface Session {
        id: string;
    }
    interface  JWT {
        id: string;
    }
}