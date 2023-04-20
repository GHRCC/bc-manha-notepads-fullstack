import path from "path";
import { Comment } from "./commentTypes";
import * as json from "../json";

const commentModelPath = path.join("src", "comment", "commentModel");
const commentModelDataPath = path.join(commentModelPath, "data");

export function findComments() {
  const commentsFiles = json.listJSON(commentModelDataPath);
  const comments = commentsFiles.map((file) => {
    return json.readJSON(commentModelDataPath, file);
  });
  return comments;
}

export function createComment(commentData: Comment) {
  const commentsLatestId = json.readJSON(
    commentModelPath,
    "commentsLatestId.json"
  );
  const commentId: number = commentsLatestId.latestId + 1;
  json.updateJSON([commentModelPath, "commentsLatestId.json"], {
    latestId: commentId,
  });

  const comment = {
    ...commentData,
    id: commentId,
  };
  json.createJSON([commentModelDataPath, `${commentId}.json`], comment);

  const response = {
    success: true,
    data: { comment },
  };

  return response;
}
