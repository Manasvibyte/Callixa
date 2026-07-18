const VideoSection = ({ localVideoRef, remoteVideoRef }) => {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm lg:col-span-3">
      {/* Participant Label */}
      <div className="absolute left-5 top-5 z-10 rounded-md bg-black/50 px-3 py-1 text-sm text-white">
        Participant
      </div>

      {/* Remote Video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="h-full w-full bg-slate-950 object-cover"
      />

      {/* You Label */}
      <div className="absolute bottom-52 right-5 z-10 rounded-md bg-black/50 px-3 py-1 text-sm text-white">
        You
      </div>

      {/* Local Video */}
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="absolute bottom-4 right-4 h-28 w-40 rounded-xl border border-slate-300 bg-slate-900 object-cover shadow-md sm:h-36 sm:w-52 lg:h-40 lg:w-60"
      />
    </div>
  );
};

export default VideoSection;
