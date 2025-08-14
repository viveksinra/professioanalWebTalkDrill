let client = null;

export function initStreamClient({ apiKey, token }) {
  // Placeholder: integrate @stream-io/video-react-sdk later
  client = { apiKey, token };
  return client;
}

export function getStreamClient() {
  return client;
}

export async function joinCall({ streamCallId }) {
  // Placeholder: use Stream web SDK to get call by id and join
  return { id: streamCallId };
}

export async function leaveCall() {
  // Placeholder: leave call via SDK
  return true;
}


