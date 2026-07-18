const MeetingHeader = ({
  meetingId,
  users,
  isMicOn,
  isCameraOn,
  handleCopyMeetingId,
  handleToggleMic,
  handleToggleCamera,
  handleLeaveMeeting,
}) => {
  return (
    <div className="mb-6 flex items-start justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Callixa
        </h1>

        <p className="mt-2 text-sm text-slate-500">Meeting ID</p>

        <div className="mt-2 flex items-center gap-2">
          <p className="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm text-slate-700">
            {meetingId}
          </p>

          <button
            onClick={handleCopyMeetingId}
            className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
          >
            Copy
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {users.length} Participant{users.length !== 1 ? "s" : ""}
        </p>

        <p className="mt-1 text-xs text-emerald-600">● Connected</p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={handleToggleMic}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          {isMicOn ? "Mute" : "Unmute"}
        </button>

        <button
          onClick={handleToggleCamera}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          {isCameraOn ? "Camera Off" : "Camera On"}
        </button>

        <button
          onClick={handleLeaveMeeting}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default MeetingHeader;
