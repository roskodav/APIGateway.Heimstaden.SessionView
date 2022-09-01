const Recordings = ({ handleSetRecordings, recordings }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  if (!recordings || !recordings.length) {
    return (
    <>
      <div onClick={handleSetRecordings} className={"recordingsWrapper"} />
      <div onClick={stopPropagation} className={"recordingsModal"}>
        <span className={"text-center"}>No recordings.</span>
      </div>
    </>
    )
  }
  return (
    <>
      <div onClick={handleSetRecordings} className={"recordingsWrapper"} />
      <div onClick={stopPropagation} className={"recordingsModal"}>
        {recordings.map((x, idx) => (
          <span key={x.id} className={"recording"}>
            <span>{idx + 1}:</span>
            <a href={x.downloadUrl}>
              {x.name}
            </a>
          </span>
        ))}
      </div>
    </>
  );
};

export default Recordings;
