import React, { useMemo, useState, useEffect } from "react";
import moment from "moment";
import DataTable from "./DataTable";
import Chat from "./Chat";
import axios from "axios";
import Recordings from "./Recordings";

const Main = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [showRecordings, setShowRecordings] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const result = await axios.get("/sessionId", {
          params: { token: params.get("token") },
        });
        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          setData([result.data]);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    };
    getData();
  }, []);

  const renderRowSubComponent = React.useCallback(
    ({ row }) => <Chat activities={row.values.activities} />,
    []
  );

  const handleSetRecordings = (e) => {
    e.preventDefault()
    setShowRecordings((current) => !current)
  };

  const columns = useMemo(
    () => [
      {
        id: "expander",
        width: 40,
        Header: ({ getToggleAllRowsExpandedProps }) => (
          <div className="icon" {...getToggleAllRowsExpandedProps()}>
            <button type="button" title="Collapse/expand all">
              ⬍
            </button>
          </div>
        ),
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            <span className="caret icon">▶</span>
          </span>
        ),
      },
      {
        Header: "Session ID",
        accessor: "id",
      },
      {
        Header: "Channel",
        accessor: "channel",
      },
      {
        Header: "Source",
        accessor: "source",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Page URL",
        accessor: "url",
      },
      {
        Header: "Operator",
        accessor: "operators[0]",
        Cell: ({ cell: { value } }) =>
          value ? (
            <div>
              {value.firstName} {value.lastName}
            </div>
          ) : null,
      },
      {
        Header: "Chatbot",
        accessor: "chatbots[0].name",
      },
      {
        Header: "Accepted",
        accessor: "started",
        Cell: ({ cell: { value } }) =>
          value ? (
            <div>{moment(value).format("DD.MM.YYYY HH:mm:ss")}</div>
          ) : null,
      },
      {
        Header: "Ended",
        accessor: "ended",
        Cell: ({ cell: { value } }) =>
          value ? (
            <div>{moment(value).format("DD.MM.YYYY HH:mm:ss")}</div>
          ) : null,
      },
      {
        Header: "Waiting time",
        accessor: "waited",
        Cell: ({ cell: { value } }) =>
          value ? (
            <div>
              {moment
                .utc(moment.duration(value, "seconds").asMilliseconds())
                .format("HH:mm:ss")}
            </div>
          ) : null,
      },
      {
        Header: "Result",
        accessor: "guest.callParams.oo1_business_result",
      },
      {
        Header: "Client's rating",
        accessor: "guestFeedbackStars",
      },
      {
        Header: "Guest left the session",
        accessor: "guestLeftSession",
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ cell: { value } }) =>
          value ? (
            <div>
              {value.map((x, i, a) => (
                <span key={i}>
                  {x.name}
                  {i !== a.length - 1 ? "," : null}
                </span>
              ))}
            </div>
          ) : null,
      },
      {
        Header: "Client's initial message",
        accessor: "activities",
        Cell: ({ cell: { value } }) => {
          if (!value) return null;
          const message = value
            .sort((x, y) => x.time.localeCompare(y.time))
            .find((x) => x.client === "Guest" && x.type === "ChatMessage");
          if (message) {
            return <div>{message.text}</div>;
          }
          return null;
        },
      },
      {
        Header: "Session note",
        accessor: "operators[0].note",
      },
      {
        Header: "Info",
        Cell: () => <a href={"https://app.mluvii.com/"}>More info</a>,
      },
        {
            Header: "Recordings",
            Cell: () => <a onClick={handleSetRecordings} href={'#'}>Show Recordings</a>
        }
    ],
    []
  );

  if (loading) {
    return (
      <main
        className={"d-flex justify-content-center align-items-center w-100"}
      >
        <div className={"text-bold"}>Loading</div>
      </main>
    );
  } else if (error) {
    return (
      <main
        className={"d-flex justify-content-center align-items-center w-100"}
      >
        <div className={"text-bold"}>{error}</div>
      </main>
    );
  } else if (!loading && !error && (!data || !data.length)) {
    return (
      <main
        className={"d-flex justify-content-center align-items-center w-100"}
      >
        <div className={"text-bold"}>No data</div>
      </main>
    );
  }

  return (
    <>
      {showRecordings && <Recordings recordings={data[0].recordings} handleSetRecordings={handleSetRecordings} />}
      <main id="main">
        <DataTable
          columns={columns}
          data={data}
          renderRowSubComponent={renderRowSubComponent}
        />
      </main>
  </>
  );
};

export default Main;
