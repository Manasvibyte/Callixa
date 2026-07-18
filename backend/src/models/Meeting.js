import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    meetingId: {
      type: String,
      required: true,
      unique: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
