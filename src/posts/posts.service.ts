import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PostsModel } from "./entities/posts.entity";
import { UsersModel } from "../users/entities/users.entity";

/**
 * author : string
 * title : string
 * content : string
 * likeCount : number
 * commentCount : number
 */

// export interface PostModel {
//   id: number;
//   author: string;
//   title: string;
//   content: string;
//   likeCount: number;
//   commentCount: number;
// }
// //
//
// let posts: PostModel[] = [
//   {
//     id: 1,
//     author: 'newjeans_official',
//     title: '뉴진스 민지',
//     content: '메이크업 고치고 있는 민지',
//     likeCount: 100000000,
//     commentCount: 9999,
//   },
//
//   {
//     id: 2,
//     author: 'newjeans_official',
//     title: '뉴진스 해린',
//     content: '노래 연습하는 해린',
//     likeCount: 100000000,
//     commentCount: 9999,
//   },
//
//   {
//     id: 3,
//     author: 'blackpink_official',
//     title: '블랙핑크 로제',
//     content: '릴스 찍고 있는 로제',
//     likeCount: 100000000,
//     commentCount: 9999,
//   },
// ];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}
  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  // save의 기능
  // id 기준
  // 1. 만약에 데이터가 존재하지 않는다면 새로 생성한다.
  // 2. 만약에 데이터가 존재한다면 업데이트한다.

  async updatePost(
    postId: number,
    title: string,
    content: string,
  ) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      }
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
