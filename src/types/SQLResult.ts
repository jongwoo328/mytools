export type SelectableSQLLanguage =
  | "sql"
  | "mysql"
  | "mariadb"
  | "postgresql"
  | "redshift"
  | "spark"
  | "snowflake";

export type SQLResultProp = {
  id: string;
  sql: string;
  language: SelectableSQLLanguage;
};
