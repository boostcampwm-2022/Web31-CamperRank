// export const typeormConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root', // MySQL ID
//   password: 'root', // MySQL password
//   database: 'camperRank',
//   entities: [User, Problem, TestCase, Solved],
//   synchronize: false, // synchronize 옵션을 true로 하면 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 되므로 절대 프로덕션에는 false로 설정
// };

export const typeormConfig = () => ({
  database: {
    host: process.env.MYSQL_HOST || '',
    port: process.env.MYSQL_PORT || '',
    username: process.env.MYSQL_USERNAME || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
  },
});
