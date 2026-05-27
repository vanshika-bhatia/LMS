function CategoryCard({ icon, title, count }) {
  return (
    <div className="category-card">
      <span className="category-icon">{icon}</span>
      <h3>{title}</h3>
      {count && <p>{count} courses</p>}
    </div>
  );
}

export default CategoryCard;
