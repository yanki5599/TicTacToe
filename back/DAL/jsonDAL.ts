import jsonfile from "jsonfile";

export default class JsonDAL<T> {
  constructor(private path: string) {
    jsonfile.writeFileSync(this.path, []); // create empty file
  }
  async readJson(): Promise<T[]> {
    return await jsonfile.readFile(this.path);
  }
  async writeJson(list: T[]): Promise<void> {
    return await jsonfile.writeFile(this.path, list);
  }
}
