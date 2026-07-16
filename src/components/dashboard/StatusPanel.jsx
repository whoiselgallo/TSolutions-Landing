import Badge from "../ui/Badge";

export default function StatusPanel({ tokens, interactivity, components }) {
  return (
    <div className="space-y-2">
      {tokens && <Badge variant="turquesa">{tokens}</Badge>}
      {interactivity && <Badge variant="naranja">{interactivity}</Badge>}
      {components && <Badge variant="blanco">{components}</Badge>}
    </div>
  );
}
