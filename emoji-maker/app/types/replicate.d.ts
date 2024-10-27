declare module 'replicate' {
  export default class Replicate {
    constructor(options: { auth: string });
    run(model: string, options: any): Promise<any>;
  }
}
