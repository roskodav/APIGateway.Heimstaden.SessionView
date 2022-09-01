import React from "react";

const renderAttachments = (attachment) => {
  switch (attachment.contentType) {
    case "application/vnd.microsoft.card.hero":
      return (
        <div className={"mt-2"}>
          {attachment.content.buttons.map((x, i) => {
            return (
              <div key={i} className="identification">
                {x.title}
              </div>
            );
          })}
        </div>
      );
    case "image/png":
      return (
        <div className={"mt-2"}>
          <img width={"100%"} src={attachment.contentUrl} alt={"Image"} />
        </div>
      );
  }
};

const ChatBotAttachments = ({ attachments }) => {
  if (!attachments) return null;
  return (
    <div className={"mt-2"}>
      {attachments.map((attachment) => renderAttachments(attachment))}
    </div>
  );
};

export default ChatBotAttachments;
