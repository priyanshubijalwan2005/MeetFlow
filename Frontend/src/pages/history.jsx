import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "../App.css";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const history = await getHistoryOfUser();

        console.log("History data received => ", history);

        // Important:
        // Agar backend se array nahi aata,
        // tab bhi meetings ko empty array rakhenge
        if (Array.isArray(history)) {
          setMeetings(history);
        } else {
          setMeetings([]);
        }
      } catch (error) {
        console.log("History error:-", error);

        // Error aane par bhi empty state show hogi
        setMeetings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = date.getDate().toString().padStart(2, "0");

    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "--:--";
    }

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredMeetings = meetings.filter((meeting) => {
    return meeting.meetingCode?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="historyPage">
      {/* ================= NAVBAR ================= */}

      <nav className="historyNavbar">
        <div className="historyBrand">
          <div className="historyLogo">
            <HistoryIcon />
          </div>

          <h2>MeetFlow</h2>
        </div>

        <button className="historyHomeButton" onClick={() => routeTo("/home")}>
          <HomeIcon />

          <span>Back to Home</span>
        </button>
      </nav>

      {/* ================= MAIN CONTENT ================= */}

      <main className="historyContainer">
        {/* ================= PAGE HEADER ================= */}

        <div className="historyHeader">
          <div className="historyTitleSection">
            <div className="historyTitleIcon">
              <HistoryIcon />
            </div>

            <div className="historyTitleText">
              <h1>Meeting History</h1>

              <p>Keep track of all your previous meetings in one place.</p>
            </div>
          </div>

          {/* SEARCH */}

          <div className="historySearch">
            <SearchIcon />

            <input
              type="text"
              placeholder="Search by meeting code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="historyStats">
          {/* TOTAL MEETINGS */}

          <div className="historyStatCard">
            <div className="statIcon">
              <VideocamIcon />
            </div>

            <div>
              <p>Total Meetings</p>

              <h2>{meetings.length}</h2>
            </div>
          </div>

          {/* SHOWING RESULTS */}

          <div className="historyStatCard">
            <div className="statIcon timeIcon">
              <AccessTimeIcon />
            </div>

            <div>
              <p>Showing Results</p>

              <h2>{filteredMeetings.length}</h2>
            </div>
          </div>
        </div>

        {/* ================= MEETING HISTORY ================= */}

        <section className="meetingHistorySection">
          {/* SECTION HEADER */}

          <div className="meetingSectionHeader">
            <div>
              <h2>Recent Meetings</h2>

              <p>Your previously completed meetings</p>
            </div>

            <span className="meetingCount">
              {filteredMeetings.length} result
              {filteredMeetings.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ================= LOADING ================= */}

          {loading ? (
            <div className="historyLoading">
              <div className="historySpinner"></div>

              <p>Loading your meeting history...</p>
            </div>
          ) : filteredMeetings.length > 0 ? (
            /* ================= MEETING CARDS ================= */

            <div className="meetingGrid">
              {filteredMeetings.map((meeting, index) => (
                <div className="meetingCard" key={meeting._id || index}>
                  <div className="meetingCardTop">
                    <div className="meetingVideoIcon">
                      <VideocamIcon />
                    </div>

                    <span className="meetingNumber">#{index + 1}</span>
                  </div>

                  {/* MEETING CODE */}

                  <div className="meetingCardContent">
                    <p className="meetingLabel">MEETING CODE</p>

                    <h3>{meeting.meetingCode}</h3>
                  </div>

                  {/* DATE AND TIME */}

                  <div className="meetingDetails">
                    {/* DATE */}

                    <div className="meetingDetail">
                      <CalendarTodayIcon />

                      <div>
                        <span>Date</span>

                        <p>{formatDate(meeting.date)}</p>
                      </div>
                    </div>

                    {/* TIME */}

                    <div className="meetingDetail">
                      <AccessTimeIcon />

                      <div>
                        <span>Time</span>

                        <p>{formatTime(meeting.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ================= EMPTY STATE ================= */

            <div className="emptyHistory">
              <div className="emptyHistoryIcon">
                <HistoryIcon />
              </div>

              <h2>{search ? "No Meetings Found" : "No Meeting History Yet"}</h2>

              <p>
                {search
                  ? "Try searching with a different meeting code."
                  : "Your completed meetings will appear here."}
              </p>

              {/* Start Meeting Button */}

              {!search && (
                <button
                  className="startMeetingButton"
                  onClick={() => routeTo("/home")}
                >
                  <VideocamIcon />

                  <span>Start a Meeting</span>
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      {/* ================= WATERMARK ================= */}

      <div className="historyWatermark">Priyanshu</div>
    </div>
  );
}
