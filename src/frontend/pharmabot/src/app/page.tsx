import { redirect } from "next/navigation";
import '../../theme.ds.ts';


export default function Home() {
  redirect("/login");
}
