export const getUserIP = (onNewIP) => {
  const myPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  const pc = new myPeerConnection({ iceServers: [] });
  const noop = function () {};
  const localIPs = {};
  const ipRegex =
    /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  const key = null;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  pc.createDataChannel("");

  pc.createOffer()
    .then((sdp) => {
      sdp.sdp.split("\n").forEach((line) => {
        if (line.indexOf("candidate") < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    })
    .catch((reason) => {});

  pc.onicecandidate = function (ice) {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
};

getUserIP((ip) => {
  showIp(ip);
});

export const showIp = (ip, res) => {
  res = ip
};
