import { Injectable } from "@nestjs/common";

@Injectable()
export class UnlikePolicy {
  canUnlike() {
    return true;
  }
}
