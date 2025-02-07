import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    author: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("post", PostSchema);

export default PostModel;
