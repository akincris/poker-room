import { RegisterForm } from "./components/Lobby/Form";

export default function Lobby() {
  return (
    <div className="flex flex-col gap-10 pt-2 items-center justify-items-center">
      <h4 className="text-4xl font-semibold">Lobby</h4>
      <RegisterForm />
    </div>
  );
}
