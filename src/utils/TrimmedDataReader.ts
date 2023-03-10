export class TrimmedDataReader {

    private readonly checkpoints: number[];
    
    private readonly data: string;
    
    private index: number;

    /**
     * @param data The data to read from.
     */
    constructor(data: string) {
        this.checkpoints = [];
        this.data = data;
        this.index = 0;
    }

    /**
     * Reads the given data from the data string and returns it if it was found.
     * @param data The data to read.
     * @returns The data if it was found, false otherwise.
     */
    public read(data: string): string | void;
    /**
     * Reads the given regex from the data string and returns it if it was found.
     * @param regex The regex to read.
     * @returns The regex result if it was found, false otherwise.
     */
    public read(regex: RegExp): RegExpExecArray | void;
    public read(arg0: RegExp | string): RegExpExecArray | string | void {
        this.index += [
            ...this.data.matchAll(/\/\/.*$|\/\*(\s|.)*?\*\/|\s+/gym)
        ].reduce((sum, current) => current[0].length + sum, 0);

        const checkpoint = this.addCheckpoint();


        if (typeof arg0 === "string") {
            if (this.data.slice(this.index).startsWith(arg0)) {
                this.cleanCheckpoint(checkpoint);

                this.index += arg0.length;

                return arg0;
            } else {
                this.revertCheckpoint(checkpoint);
            }
        } else {
            const result = new RegExp(arg0.source, "y" + arg0.flags.replace(/[syg]/g, "")).exec(this.data.slice(this.index)) ?? false;

            if (result) {
                this.cleanCheckpoint(checkpoint);

                this.index += result[0].length;

                return result;
            } else {
                this.revertCheckpoint(checkpoint);
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
     * Returns the index of the given checkpoint.
     * 
     * **WARNING!** This method will invalidate all checkpoints with a higher index than the one passed in.
     * @param index The index of the checkpoint to revert to.
     */
    public revertCheckpoint(index: number): void {
        this.index = this.checkpoints[this.cleanCheckpoint(index)];
    }

    /**
     * Removes a checkpoint from the checkpoints array and returns it's value.
     * 
     * **WARNING!** This method will invalidate all checkpoints with a higher index than the one passed in.
     * @param index The index of the checkpoint to remove.
     * @returns The value of the removed checkpoint.
     */
    public cleanCheckpoint(index: number): number {
        return this.checkpoints.splice(index)[0];
    }
}