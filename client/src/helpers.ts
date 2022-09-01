export const getSysMsg = (code, result) => {
  const messages = {
    'sysMsgKey.AvGetMediaResultNoCameraOnlyMic': 'Client connected only using their microphone.',
    'sysMsgKey.AvGetMediaResultNoDevices': 'Client could not use any av device and will only see and hear the operator but will not broadcast.',
    'sysMsgKey.AvGetMediaResultSuccess': 'Client connected using their av devices.',
    'sysMsgKey.AvGetMediaResultUserDenied': 'Client refused to share their av devices.',
    'sysMsgKey.AvRequest': 'Operator sent a request for video call.',
    'sysMsgKey.AvResponse': 'AV response',
    'sysMsgKey.AvResponseAccepted': 'Client accepted the request for video call.',
    'sysMsgKey.AvResponseRejected': 'Client declined the request for video call.',
    'sysMsgKey.ChatToMail': 'Chat transcript sent to e-mail',
    'sysMsgKey.ChatWindowOpened': 'Chat window opened',
    'sysMsgKey.Chatbot': 'by chatbot',
    'sysMsgKey.CobrowsingStarted': 'Co-browsing accepted',
    'sysMsgKey.CobrowsingStoppedByGuest': 'Co-browsing has been stopped by client',
    'sysMsgKey.FileUploadFailed': 'Could not receive file',
    'sysMsgKey.Guest': 'by client',
    'sysMsgKey.OfflineFormSubmitted': 'Offline form submitted',
    'sysMsgKey.OnHold': 'Call put on hold',
    'sysMsgKey.OperatorInviteRejected': 'An operator rejected invitation',
    'sysMsgKey.OperatorInvited': 'Another operator was invited',
    'sysMsgKey.OperatorKicked': 'An operator was disconnected from session',
    'sysMsgKey.PhotoRequest': 'Request to take a photo',
    'sysMsgKey.ResumeGuest': 'Call resumed',
    'sysMsgKey.ScreenSharingFailedByGuest': "The client's browser doesn't support this feature",
    'sysMsgKey.SessionEnded': 'Session ended',
    'sysMsgKey.SessionForwarded': 'Conversation was forwarded to',
    'sysMsgKey.SharedFile': 'Shared file',
    'sysMsgKey.SharedScreen': 'Screen sharing',
    'sysMsgKey.TriggerChatOffered': 'Chat offered by trigger',
    'sysMsgKey.UpgradeToFull': 'You can connect to the session with one click.',
    'sysMsgKey.User': 'by operator',
    'sysMsgKey.WelcomeMessage': 'Welcome message displayed',
    'sysMsgKey.accepted': 'Accepted',
    'sysMsgKey.enteredQueue': 'Queue entered',
    'sysMsgKey.forwarded.group': 'another group',
    'sysMsgKey.forwarded.phone': 'a phone',
    'sysMsgKey.forwarded.user': 'another operator',
    'sysMsgKey.guestLeft': 'Guest left',
    'sysMsgKey.operatorJoined': 'Operator joined',
    'sysMsgKey.operatorLeft': 'Operator left',
    'sysMsgKey.rejected': 'Rejected',
    'sysMsgKey.terminationReason.CallForwardedToExternalPhone': 'due to external call forwarding',
    'sysMsgKey.terminationReason.CampaignFailedDial': 'due to unsuccessful telephone dialing',
    'sysMsgKey.terminationReason.CampaignTerminated': 'due to the termination of the campaign',
    'sysMsgKey.terminationReason.ChatbotLeft': 'by chatbot',
    'sysMsgKey.terminationReason.ExternalSessionExpired': 'after external session timeout',
    'sysMsgKey.terminationReason.FailedRouting': 'due to failed routing',
    'sysMsgKey.terminationReason.GuestAbandoned': 'after the client disconnection timeout',
    'sysMsgKey.terminationReason.GuestLeft': 'by client',
    'sysMsgKey.terminationReason.OperatorAbandoned': 'after the operator disconnection timeout',
    'sysMsgKey.terminationReason.OperatorLeft': 'by operator',
    'sysMsgKey.terminationReason.OperatorWithoutExtension': 'due to inactive operator extension',
    'sysMsgKey.terminationReason.SessionApiCall': 'by calling API',
    'sysMsgKey.terminationReason.UnknownReason': 'due to unknown reason',
  };
  if(code === 'terminationReason' || code === 'forwaded') {
    return messages[`sysMsgKey.${code}${result ? `.${result}` : ''}`];
  }
  return messages[`sysMsgKey.${code}${result ? `${result}` : ''}`];
};

export const parseHTML = (str) => {
  const parser = new DOMParser();
  const result = parser.parseFromString(str, "text/html");
  return result.documentElement.textContent;
}

