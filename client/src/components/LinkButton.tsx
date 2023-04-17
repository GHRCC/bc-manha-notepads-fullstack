import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  children: string;
};

export function LinkButton(props: LinkButtonProps) {
  return (
    <Link
      to={props.to}
      className="bg-green-400 hover:bg-green-500 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg"
    >
      {props.children}
    </Link>
  );
}
