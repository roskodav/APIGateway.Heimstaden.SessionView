import { parseHTML } from "../../helpers";
import React from "react";

const renderHeroMessage = (field, value) => {
  switch (field.inputType) {
    case 6:
    case "RichText":
      return <p style={{ textAlign: "center" }}>{parseHTML(field.label)}</p>;
    case 1:
    case 2:
    case 3:
    case "Email":
    case "Phone":
    case "Text":
      return (
        <>
          <div className="label mt-2">{field.label}</div>
          <input type="text" className="w-100" disabled value={value} />
        </>
      );
    case 5:
    case "TextArea":
      return (
        <>
          <div className="label mt-2">{field.label}</div>
          <textarea className="w-100" rows={3} disabled>
            ok
          </textarea>
        </>
      );
    case "Identification":
      return <div className="identification">Authentication Card</div>;
    case "Radio":
    case "Select":
      return (
        <>
          <div className="label mt-2">{field.label}</div>
          {field.choiceOptions.forEach((option) => {
            const checked = value && value === option.value ? "checked" : "";
            return (
              <div className="d-flex h-32 align-items-center">
                <input
                  type="radio"
                  className="mr-2"
                  checked={!!checked}
                  disabled
                />
                {option.label}
              </div>
            );
          })}
        </>
      );
    default:
      return null;
  }
};

const HeroCard = ({ activity, submissionParams, submission, time }) => {
  return (
    <>
      <div className="clear" />
      <div className="herocard">
        {activity.heroCard.map((field, index) => {
          let value =
            Object.keys(submissionParams || {}).find((key) => {
              if (field.key) {
                field.key = field.key.toLowerCase();
              }
              return key.toLowerCase() === field.key;
            }) || "";
          if (value) {
            value = submissionParams[value];
          }
          return (
            <React.Fragment key={index}>
              {renderHeroMessage(field, value)}
            </React.Fragment>
          );
        })}
        {submission ? (
          <div className="mt-3 mx-auto w-100 text-center">
            {typeof submission.client !== "number" ? (
              <>
                {submission.submissionResult} by {submission.client}
              </>
            ) : null}
          </div>
        ) : (
          <div className="mt-3 mx-auto w-100 text-center">Not submitted</div>
        )}
        <small className="mt-2 d-block text-center">{time}</small>
      </div>
    </>
  );
};

export default HeroCard;
