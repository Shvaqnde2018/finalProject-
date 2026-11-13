export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Пошук слова або перекладу..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="input-field"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="select-field"
      >
        <option value="all">Усі категорії</option>
        <option value="IT">IT</option>
        <option value="Подорожі">Подорожі</option>
        <option value="Життя">Життя</option>
        <option value="Базові">Базові</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="select-field"
      >
        <option value="all">Усі статуси</option>
        <option value="learned">Вивчені</option>
        <option value="learning">На вивченні</option>
      </select>
    </div>
  );
}