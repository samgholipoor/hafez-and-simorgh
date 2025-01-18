function Badges() {
  return (
    <ul className="flex gap-4">
      <li>
        <div className="flex items-center gap-1 bg-opacity-10 bg-warning px-2 rounded-lg">
          <div className="w-2 h-2 bg-warning rounded-full" />
          <span className="text-xs text-warning"> Weight Changes </span>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-1 bg-opacity-15 bg-error rounded-full px-2">
          <div className="w-2 h-2 bg-error rounded-full" />
          <span className="text-xs text-error"> Remove </span>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-1 bg-opacity-15 bg-primary rounded-full px-2">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-xs text-primary"> Add </span>
        </div>
      </li>
    </ul>
  );
}

export default Badges;
