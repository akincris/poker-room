import { CardPicker } from "../components/Room/CardPicker";
import { ParticipantList } from "../components/Room/Participants";

export default function Room() {
  return (
    <div className="flex flex-col gap-10 pt-2 items-center">
      <h4 className="text-2xl lg:text-4xl font-semibold">Room [21345@$]</h4>

      <div className="flex relative w-full gap-4">
        <ParticipantList />
        <CardPicker />
      </div>
    </div>
  );
}
