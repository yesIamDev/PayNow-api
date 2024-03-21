

export default class commonQuery {
    static async testIfUnique(config: {
        LucidModel: any, column: string, value: any
    }) {
        return await config.LucidModel.findBy(config.column, config.value);
    }
}