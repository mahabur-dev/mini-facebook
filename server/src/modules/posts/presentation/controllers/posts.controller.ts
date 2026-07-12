import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { CreatePostService } from "../../application/services/create-post.service";
import { GetPostService } from "../../application/services/get-post.service";
import { UpdatePostService } from "../../application/services/update-post.service";
import { DeletePostService } from "../../application/services/delete-post.service";
import { presentPost } from "../presenters/post.presenter";

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private readonly createPostService: CreatePostService,
    private readonly getPostService: GetPostService,
    private readonly updatePostService: UpdatePostService,
    private readonly deletePostService: DeletePostService,
  ) {}

  @Post()
  async create(@CurrentUser() user: { sub: string }, @Body() dto: CreatePostDto) {
    const result = await this.createPostService.execute({
      authorId: user.sub,
      content: dto.content,
      visibility: dto.visibility,
      mediaId: dto.mediaId,
    });
    return { post: presentPost(result.post) };
  }

  @Get(":postId")
  async get(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    const result = await this.getPostService.execute(user.sub, postId);
    return { post: presentPost(result.post) };
  }

  @Patch(":postId")
  async update(@CurrentUser() user: { sub: string }, @Param("postId") postId: string, @Body() dto: UpdatePostDto) {
    const result = await this.updatePostService.execute(user.sub, postId, dto);
    return { post: presentPost(result.post) };
  }

  @Delete(":postId")
  async delete(@CurrentUser() user: { sub: string }, @Param("postId") postId: string) {
    return this.deletePostService.execute(user.sub, postId);
  }
}
