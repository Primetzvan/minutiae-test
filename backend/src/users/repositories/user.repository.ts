import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /*private async getUserWithDoornames(userId: number) {
    const user = await this.findOne(userId);

    const query = this.createQueryBuilder('door')
      .leftJoin('door.accessors', 'user')
      .where('user.userUuid = :userId', { userId });

    const doors = await query.getMany();
    const doornames = [];
    doors.forEach((door) => doornames.push(door));

    user.accesses = doornames;
    return doornames;
  }*/
}
