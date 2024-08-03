import { useParams } from "react-router-dom";

export default function AddPathParameters() {
  const { a, b } = useParams<{ a: string; b: string }>();

  const numA = parseInt(a ?? "3", 10);
  const numB = parseInt(b ?? "4", 10);

  return (
    <div id="wd-add">
      <hr />
      <h4>Add Path Parameters</h4>
      {numA} + {numB} = {numA + numB}
    </div>
  );
}
