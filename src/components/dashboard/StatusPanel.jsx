import Badge from "../ui/Badge";

export default function StatusPanel({ tokens, interactivity }) {
  return (
    <div className="space-y-2">
      <Badge variant="turquesa">Tokens: {tokens}</Badge>
      <Badge variant="turquesa">Interactividad: {interactivity}</Badge>
    </div>
  );
}
