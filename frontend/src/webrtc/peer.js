let peer = null;

export const createPeerConnection = () => {
  // Prevent creating multiple peer connections
  if (peer) return peer;

  peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302", // STUN server
      },
    ],
  });

  peer.oniceconnectionstatechange = () => {
    console.log("ICE State:", peer.iceConnectionState);
  };

  return peer;
};

export const getPeerConnection = () => peer;

export const createOffer = async () => {
  if (!peer) {
    throw new Error("Peer connection has not been created.");
  }

  const offer = await peer.createOffer();

  await peer.setLocalDescription(offer);

  return offer;
};

export const createAnswer = async (offer) => {
  if (!peer) {
    throw new Error("Peer connection has not been created.");
  }

  await peer.setRemoteDescription(offer);

  const answer = await peer.createAnswer();

  await peer.setLocalDescription(answer);

  return answer;
};

export const setRemoteAnswer = async (answer) => {
  if (!peer) {
    throw new Error("Peer connection has not been created.");
  }

  await peer.setRemoteDescription(answer);
};

export const closePeerConnection = () => {
  if (peer) {
    peer.close();
    peer = null;
  }
};

//ICE candidates
export const addIceCandidate = async (candidate) => {
  if (!peer) {
    throw new Error("Peer connection has not been created.");
  }

  await peer.addIceCandidate(candidate);
};

export const setIceCandidateHandler = (callback) => {
  if (!peer) return;

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      callback(event.candidate);
    }
  };
};

export const setRemoteTrackHandler = (callback) => {
  if (!peer) return;

  peer.ontrack = (event) => {
    console.log("📹 Remote track received");

    callback(event.streams[0]);
  };
};
