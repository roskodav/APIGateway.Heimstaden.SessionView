import React from "react";
import moment from "moment";
import { getSysMsg, parseHTML } from "../../helpers";
import HeroCard from "./HeroCard";
import ChatBotAttachments from "./ChatBotAttachment";

const renderMessage = (activity, activities) => {
  const time = moment(activity.time).format("HH:mm");
  switch (activity.type) {
    case 11:
    case "ChatbotMessage":
      const chatbotContent = activity.chatbotMessageContent;
      const attachments = chatbotContent?.attachments;
      if (chatbotContent) {
        return (
          <>
            <div className="clear" />
            <div className="herocard">
              <div className="mx-auto w-100 text-center">
                <div>{chatbotContent.text}</div>
                <ChatBotAttachments attachments={attachments} />
              </div>
            </div>
          </>
        );
      } else return null;
    case "SessionForwarded":
    case "AvRequest":
    case "ChatToMail":
    case "AvResponse":
    case "SharedScreen":
    case "AvGetMediaResult":
    case "SharedFile":
    case "CobrowsingStoppedByGuest":
      const fileName =
        activity.file && activity.file.name ? activity.file.name : "";
      return (
        <>
          <div className="clear" />
          <div className="sys-msg">
            <div>{getSysMsg(activity.type, activity.result)}</div>
            <div>{fileName}</div>
            <div className="time">{time}</div>
          </div>
        </>
      );
    case "SessionEnded":
      return (
        <>
          <div className="clear" />
          <div className="sys-msg">
            <div>
              {getSysMsg(activity.type, activity.result)}{" "}
              {getSysMsg(activity.client, activity.result)}
            </div>
            <div className="time">{time}</div>
          </div>
        </>
      );
    case "WelcomeMessage":
    case "AutoActivity":
    case "ChatMessage":
    case "ExternalMessage":
    case 1:
    case "LastFarewellMessage":
      const sender = activity.client !== "Guest" ? "" : " guest";
      if (activity.file) {
        return (
          <div className={`msg${sender}`}>
            <div className="file">FILE</div>
            <div className="d-inline-block">{activity.file.name}</div>
            <span>&nbsp;</span>
            <span className="time">{time}</span>
          </div>
        );
      }
      return (
        <div className={`msg${sender}`}>
          <div className="d-inline-block">
            <p>{parseHTML(activity.text)}</p>
            <span>&nbsp;</span>
          </div>
          <span className="time mx-auto">{time}</span>
        </div>
      );
    case 9:
    case "HeroCard":
      const submission = activities.find(
        (act) =>
          act.submissionOfActivityId === activity.activityId &&
          (act.type === "HeroCardSubmission" || act.type == 10)
      );
      const submissionParams = submission ? submission.submissionParams : {};
      return (
        <HeroCard
          activity={activity}
          submission={submission}
          submissionParams={submissionParams}
          time={time}
        />
      );
    default:
      if (activity.text) {
        return (
          <div className={"sys-msg"}>
            <div className="d-inline-block">
              {activity.text}
              <span>&nbsp;</span>
            </div>
            <span className="time mx-auto">{time}</span>
          </div>
        );
      } else {
        return null;
      }
  }
};
const Chat = ({ activities }) => {
  if (!activities) {
    return (
      <tr className="chat">
        <td>
          <div className="clear" />
          <div className="sys-msg">
            <div>No data</div>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <tr className="chat">
      <td>
        {activities
          .sort((x, y) => x.time.localeCompare(y.time))
          .map((activity, i, a) => (
            <div key={activity.activityId}>{renderMessage(activity, a)}</div>
          ))}
      </td>
    </tr>
  );
};

export default Chat;
