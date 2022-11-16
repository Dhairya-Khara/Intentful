export default class OutputBoundary{
    static output = {};

    static setOutput(output){
        this.output = output;
    }

    static getOutput(){
        return this.output;
    }
}