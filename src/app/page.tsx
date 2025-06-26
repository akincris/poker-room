import { RegisterForm } from "./components/Lobby/Form";
import { Icon } from "./utils/Icons";

export default function Lobby() {
  return (
    <div className="flex flex-col gap-10 pt-2 items-center justify-items-center">
      <div className="flex gap-2">
        <h4 className="text-4xl font-semibold">Lobby</h4>
        <Icon name="dices" />
      </div>
      <RegisterForm />
    </div>
  );
}
