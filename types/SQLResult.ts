export type SelectableSQLLanguage = "sql" | "mysql" | "mariadb" | "postgresql" | "redshift" | "spark" | "snowflake";

export type SQLResult = {
  id: string;
  sql: string;
  language: SelectableSQLLanguage;
};
