"use client";
import { getErrorMessage } from "@/app/utils/formErrors";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = handleSubmit((formData) => {});

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-10 p-4 border w-full lg:max-w-xl rounded-2xl"
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
          className="rounded-2xl hover:border-white dark:hover:text-[#9767b8] dark:hover:border-[#9767b8] hover:text-white duration-300 transition-colors cursor-pointer border w-full lg:w-auto grow items-center flex py-5 px-4 gap-2.5 justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-2xl hover:border-white dark:hover:text-[#9767b8] dark:hover:border-[#9767b8] hover:text-white duration-300 transition-colors cursor-pointer border w-full lg:w-auto grow items-center flex py-5 px-4 gap-2.5 justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Play
        </button>
      </div>
    </form>
  );
};
