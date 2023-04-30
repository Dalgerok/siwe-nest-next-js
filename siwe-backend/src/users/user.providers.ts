import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { globalConstants } from 'src/global_constants';

export const userProviders = [
  {
    provide: globalConstants.user_repository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [globalConstants.data_source],
  },
];
