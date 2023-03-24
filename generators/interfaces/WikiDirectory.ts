import { WikiPage } from "./WikiPage";

export interface WikiDirectory {
    path: string;
    pages: Array<WikiPage | WikiDirectory>;
}