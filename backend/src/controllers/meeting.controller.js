import { v4 as uuid } from "uuid";
import Meeting from "../models/Meeting.js";

export const createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create({
      meetingId: uuid(),
      host: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Meeting created successfully.",
      meetingId: meeting.meetingId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const joinMeeting = async (req, res) => {
  const { meetingId } = req.params;

  try {
    const meeting = await Meeting.findOne({ meetingId });

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Meeting found.",
      meetingId: meeting.meetingId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
