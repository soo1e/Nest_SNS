/**
 * id : number
 *
 * nickname : string
 *
 * email : string
 *
 * password : string
 *
 * role : [RolesEnum.USER, RolesEnum.ADMIN]
 */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "../../posts/entities/posts.entity";

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
  })
    // 1) 최대 길이 20
    // 2) 유일무이한 값이 될 것

  nickname: string;
    // 1) 유일무이한 값이 될 것
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
