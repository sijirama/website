export default function Youtube({ id }: { id: string }) {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encypted-media"
        title="Embedded Youtube videos"
        className="w-32 h-48"
      />
    </div>
  );
}
