interface CoordinateDisplayProps {
  className: string;
  label: string;
  value: number;
}

export default function CoordinateDisplay({ className, label, value }: CoordinateDisplayProps) {
    return (
      <div className={`${className} text-[12.5px]`}>
        <span className="text-white">{label}: {value.toFixed(2)}</span>
      </div>
    );
}
