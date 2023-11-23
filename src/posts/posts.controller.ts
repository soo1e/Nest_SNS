import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  Param, Patch,
  Post, Put
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  // 1) GET /posts
  // 모든 post를 가져온다

  @Get()
  getPosts() {
    return this.postsService.getAllPosts()
  }

  // 2) GET /posts/:id
  // id에 해당되는 post를 가져온다

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  // post를 생성한다

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  // 4) PUT /posts/:id
  // id에 해당되는 post를 변경한다
  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Param('author') author?: string,
    @Param('title') title?: string,
    @Param('content') content?: string,
  ) {
    return this.postsService.updatePost(+id, author, title, content);
  }

  // 5) DELETE /posts/:id
  // id에 해당되는 post를 삭제한다
  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ) {
    return this.postsService.deletePost(+id);
  }
}