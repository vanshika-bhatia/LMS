function LectureList({ lectures, onSelect, currentUrl }) {
  return (
    <div className="lecture-list">
      {lectures.map((lecture) => (
        <div
          key={lecture._id}
          className={`lecture-item ${currentUrl === lecture.videoUrl ? "active" : ""}`}
          onClick={() => onSelect(lecture.videoUrl)}
        >
          <span className="lecture-icon">▶</span>
          <span className="lecture-title">{lecture.title}</span>
        </div>
      ))}
    </div>
  );
}

export default LectureList;
