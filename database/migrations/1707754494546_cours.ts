import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "cours";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table
        .uuid("teacher_id")
        .unsigned()
        .references("teachers.id")
        .onDelete("CASCADE"); // delete cours when teacher is deleted

      table.string("title", 50);
      table.string("description", 255);

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
