import { globalConstants } from 'src/global_constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: globalConstants.data_source,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'db',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // !!! DON'T USE IN PRODUCTION !!!
      });

      return dataSource.initialize();
    },
  },
];
