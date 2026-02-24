import { useState } from "react";

const availability = [
  {
    date: "Thursday, Feb 26",
    slots: ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
    note: "Before 1:00 PM"
  },
  {
    date: "Friday, Feb 27",
    slots: ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
    note: "Before 11:30 AM or 2:00–4:00 PM"
  },
  {
    date: "Monday, Mar 3",
    slots: ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
    note: "Before 11:00 AM or After 12:00 PM"
  },
  {
    date: "Tuesday, Mar 4",
    slots: ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
    note: "Before 1:00 PM"
  },
  {
    date: "Wednesday, Mar 5",
    slots: ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
    note: "Before 1:00 PM"
  }
];

const durations = ["30 min", "45 min", "1 hour", "1.5 hours"];

export default function Scheduler() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("1 hour");
  const [confirmed, setConfirmed] = useState(false);

  const handleDateSelect = (idx) => {
    setSelectedDate(idx);
    setSelectedSlot(null);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    if (selectedDate !== null && selectedSlot !== null) {
      setConfirmed(true);
    }
  };

  const reset = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setConfirmed(false);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", maxWidth: 680, margin: "0 auto", padding: "24px 16px", color: "#1a1a2e" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)", borderRadius: 16, padding: "24px 28px", marginBottom: 24, color: "white" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, marginBottom: 6 }}>BIG × IIRER</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Schedule a Meeting with Robyn & Jim</h1>
        <p style={{ margin: "8px 0 0", fontSize: 13, opacity: 0.75 }}>Working hours: 8:30 AM – 4:30 PM · Select a date and time below</p>
      </div>

      {confirmed ? (
        <div style={{ textAlign: "center", padding: "40px 24px", background: "#f0fdf4", borderRadius: 16, border: "1px solid #bbf7d0" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <h2 style={{ margin: "0 0 8px", color: "#166534" }}>Meeting Proposed!</h2>
          <p style={{ color: "#15803d", margin: "0 0 4px", fontWeight: 600, fontSize: 16 }}>
            {availability[selectedDate].date} at {selectedSlot}
          </p>
          <p style={{ color: "#4b5563", fontSize: 13, margin: "0 0 20px" }}>Duration: {selectedDuration}</p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 24px" }}>
            You can now reply to Robyn with this proposed time.<br/>Remember to ask if the scoping documents need to be signed.
          </p>
          <button onClick={reset} style={{ background: "#1a1a2e", color: "white", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 14 }}>
            Pick a Different Time
          </button>
        </div>
      ) : (
        <>
          {/* Duration picker */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#6b7280", marginBottom: 8 }}>Meeting Duration</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {durations.map(d => (
                <button key={d} onClick={() => setSelectedDuration(d)} style={{
                  padding: "7px 16px", borderRadius: 20, border: `2px solid ${selectedDuration === d ? "#0f3460" : "#e5e7eb"}`,
                  background: selectedDuration === d ? "#0f3460" : "white", color: selectedDuration === d ? "white" : "#374151",
                  cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.15s"
                }}>{d}</button>
              ))}
            </div>
          </div>

          {/* Date picker */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#6b7280", marginBottom: 8 }}>Available Dates</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {availability.map((day, idx) => (
                <button key={idx} onClick={() => handleDateSelect(idx)} style={{
                  textAlign: "left", padding: "14px 18px", borderRadius: 12,
                  border: `2px solid ${selectedDate === idx ? "#0f3460" : "#e5e7eb"}`,
                  background: selectedDate === idx ? "#eff6ff" : "white",
                  cursor: "pointer", transition: "all 0.15s"
                }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: selectedDate === idx ? "#0f3460" : "#1a1a2e" }}>{day.date}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{day.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time slot picker */}
          {selectedDate !== null && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#6b7280", marginBottom: 8 }}>
                Available Times — {availability[selectedDate].date}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {availability[selectedDate].slots.map(slot => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)} style={{
                    padding: "8px 14px", borderRadius: 8,
                    border: `2px solid ${selectedSlot === slot ? "#0f3460" : "#e5e7eb"}`,
                    background: selectedSlot === slot ? "#0f3460" : "white",
                    color: selectedSlot === slot ? "white" : "#374151",
                    cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.15s"
                  }}>{slot}</button>
                ))}
              </div>
            </div>
          )}

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={selectedDate === null || selectedSlot === null}
            style={{
              width: "100%", padding: "14px", borderRadius: 12, border: "none",
              background: selectedDate !== null && selectedSlot !== null ? "linear-gradient(135deg, #1a1a2e, #0f3460)" : "#e5e7eb",
              color: selectedDate !== null && selectedSlot !== null ? "white" : "#9ca3af",
              cursor: selectedDate !== null && selectedSlot !== null ? "pointer" : "not-allowed",
              fontSize: 15, fontWeight: 600, transition: "all 0.2s"
            }}
          >
            {selectedDate !== null && selectedSlot !== null
              ? `Propose: ${availability[selectedDate].date} at ${selectedSlot} (${selectedDuration})`
              : "Select a date and time to continue"}
          </button>

          {/* Note about signing */}
          <div style={{ marginTop: 16, padding: "12px 16px", background: "#fffbeb", borderRadius: 10, border: "1px solid #fcd34d", fontSize: 13, color: "#92400e" }}>
            📝 <strong>Reminder:</strong> Robyn also asked whether she needs to sign all scoping documents — she can't do so until Friday. Consider clarifying this in your reply.
          </div>
        </>
      )}
    </div>
  );
}
