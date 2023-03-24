interface Window {
    readonly marked: {
        parse: (markdown: string) => string;
    };
}