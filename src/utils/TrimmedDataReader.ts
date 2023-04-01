export class TrimmedDataReader {

    public index: number;

    public readonly data: string;
    
    private readonly checkpoints: number[];

    /**
     * @param data The data to read from.
     */
    constructor(data: string) {
        this.checkpoints = [];
        this.data = data;
        this.index = 0;

        this.skipWhitespace();
    }

    /**
     * Reads the given data from the data string and returns it if it was found.
     * @param data The data to read.
     * @returns The data if it was found, false otherwise.
     */
    public read(data: string): string | undefined;
    /**
     * Reads the given regex from the data string and returns it if it was found.
     * @param regex The regex to read.
     * @returns The regex result if it was found, false otherwise.
     */
    public read(regex: RegExp): RegExpExecArray | undefined;
    public read(arg0: RegExp | string): RegExpExecArray | string | undefined {
        if (typeof arg0 == "string") {
            if (this.data.startsWith(arg0, this.index)) {
                this.index += arg0.length;

                return arg0;
            }
        } else {
            const result = new RegExp(arg0.source, "y" + arg0.flags.replace(/[syg]/g, "")).exec(this.data.slice(this.index));

            if (result) {
                this.index += result[0].length;

                return result;
            }
        }
    }

    /**
     * Creates a new checkpoint and returns it's index.
     * @returns The checkpoint index.
     */
    public addCheckpoint(): number {
        return this.checkpoints.push(this.index) - 1;
    }

    /**
     * Returns to the index of the given checkpoint.
     * 
     * **WARNING!** This method will invalidate all checkpoints with a higher index than the one passed as an argument.
     * @param index The index of the checkpoint to revert to.
     */
    public revertToCheckpoint(index: number): void {
        this.index = this.cleanCheckpoint(index);
    }

    /**
     * Removes a checkpoint from the checkpoints array and returns it's value.
     * 
     * **WARNING!** This method will invalidate all checkpoints with a higher index than the one passed as an argument.
     * @param index The index of the checkpoint to remove.
     * @returns The value of the removed checkpoint.
     */
    public cleanCheckpoint(index: number): number {
        return this.checkpoints.splice(index)[0];
    }

    /**
     * Skips all whitespace and returns the amount of skipped characters.
     * @returns The amount of skipped characters.
     */
    public skipWhitespace(): number {
        const measuredWhitespace = this.measureWhitespace();

        this.index += measuredWhitespace;

        return measuredWhitespace;
    }

    /**
     * Test if the following data is whitespace.
     * **WARNING!** This method will shift the reader's index to the end of the whitespace.
     * @returns The result of the test.
     */
    public isAtWhitespace(): boolean {
        return this.skipWhitespace() > 0;
    }

    /**
     * Test if the reader is at the end of the data string.
     * @returns The result of the test.
     */
    public isAtEnd(): boolean {
        return this.index >= this.data.length;
    }

    /**
     * Throws a syntax error at the given index.
     * @param index The index to throw the error at.
     * @throws A syntax error.
     */
    public throwSyntaxError(index = this.index): never {
        const padding = 20;
        const before = this.data.slice(0, index);
        const lines = before.split(/\r?\n/);

        throw [
            `Unexpected symbol on line ${lines.length}, col ${lines[lines.length - 1].length + 1}}`,
            this.data.slice(index - padding, index + padding),
            " ".repeat(padding) + "^"
        ].join("\n");
    }

    private measureWhitespace(): number {
        return /(?:\/\/.*$|\/\*(?:\s|.)*?\*\/|\s+)+/my.exec(this.data.slice(this.index))?.[0].length ?? 0;
    }
}