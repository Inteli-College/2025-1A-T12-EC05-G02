export default function CoordinateDisplay({ className, label, value }) {
    return (
      <div className={`${className} text-[12.5px]`}>
        <span className="text-white">{label}: {value.toFixed(2)}</span>
      </div>
    );
}
