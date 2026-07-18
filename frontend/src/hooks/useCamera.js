import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import {
  createPeerConnection,
  setIceCandidateHandler,
  setRemoteTrackHandler,
  closePeerConnection,
} from "../webrtc/peer";

const useCamera = (remoteSocketIdRef) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isReady, setIsReady] = useState(false); // Indicates whether the camera and peer connection are ready

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const peer = createPeerConnection();

        stream.getTracks().forEach((track) => {
          // video track, audio track...
          peer.addTrack(track, stream);
        });

        // Send ICE candidates to the remote peer
        setIceCandidateHandler((candidate) => {
          socket.emit("ice-candidate", {
            target: remoteSocketIdRef.current,
            candidate,
          });
        });

        // Display remote video stream
        setRemoteTrackHandler((remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });

        setIsReady(true); // Camera and peer connection are ready
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startCamera();

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      closePeerConnection();
    };
  }, [remoteSocketIdRef]);

  const handleToggleMic = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);
  };

  const handleToggleCamera = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOn(videoTrack.enabled);
  };

  return {
    localVideoRef,
    remoteVideoRef,
    localStreamRef,

    isMicOn,
    isCameraOn,
    isReady,

    handleToggleMic,
    handleToggleCamera,
  };
};

export default useCamera;
