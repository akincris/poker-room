"use client";
import { IRoom } from "@/app/interfaces/room";
import { getErrorMessage } from "@/app/utils/formErrors";
import { updatePlayerData } from "@/lib/features/player-slice";
import { updateRoomData } from "@/lib/features/room-slice";
import { useAppDispatch } from "@/lib/hooks";
import { socket } from "@/socket";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [loading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = handleSubmit((formData) => {
    setIsLoading(true);
    const data = { name: formData.name, createdAt: new Date().getTime() };
    dispatch(updatePlayerData(data));

    socket.emit("register", data);
  });

  useEffect(() => {
    socket.on("roomData", (room: IRoom) =>
      setTimeout(() => {
        setIsLoading(false);

        dispatch(updateRoomData(room));
        redirect(`/room/${room.id}`);
      }, 1000)
    );
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      data-loading={loading}
      className="flex group flex-col data-[loading=true]:animate-pulse gap-10 p-4 border w-full lg:max-w-xl rounded-2xl"
    >
      <div className="flex flex-col gap-2">
        <label className="md:text-base text-sm font-semibold">
          <span>
            Name
            <sup>*</sup>
          </span>
        </label>
        <div className="relative w-full">
          <input
            {...register("name", {
              required: true,
              maxLength: 20,
              pattern: new RegExp("^(?=.*[A-Za-z]).+$"),
            })}
            placeholder="Type your name"
            className="rounded-2xl w-full text-white border gap-2.5 flex p-4 disabled:cursor-not-allowed focus:outline-none disabled:bg-gray-50"
          />
        </div>
        <span
          data-error={!!errors["name"]}
          className="text-red-300 text-xs data-[error=true]:h-4 h-0 duration-300 transition-all"
        >
          {getErrorMessage({ errors, name: "name", label: "Name" })}
        </span>
      </div>
      <hr />
      <div className="flex lg:flex-row flex-col gap-3">
        <button
          type="reset"
          disabled={loading}
          className="rounded-2xl text-white hover:border-white dark:hover:text-[#9767b8] dark:hover:border-[#9767b8] hover:text-white duration-300 transition-colors cursor-pointer border w-full lg:w-auto grow items-center flex py-5 px-4 gap-2.5 justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl text-white hover:border-white dark:hover:text-[#9767b8] dark:hover:border-[#9767b8] hover:text-white duration-300 transition-colors cursor-pointer border w-full lg:w-auto grow items-center flex py-5 px-4 gap-2.5 justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Play
        </button>
      </div>
    </form>
  );
};
