"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useModal } from "@/components/providers/modal-provider";
import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { ArrowRight } from "lucide-react";
import zod from "zod";
import { api } from "@/trpc/react";
import { updateUsernameSchema } from "@/schemas/user.schemas";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Spinner } from "@/components/ui/spinner";
import { signOut } from "next-auth/react";
import { Error } from "@/components/ui/error";
import { USERNAME_REGEX } from "@/constants/user.constants";

interface Props {}

type UsernameForm = {
  username: string;
};

export const SetupUsernameModal = ({}: Props) => {
  const { overwrite } = useSession();

  const { close, unlock } = useModal();
  const mutation = api.user.updateUsername.useMutation();
  const utils = api.useUtils();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UsernameForm>();

  const onSubmit: SubmitHandler<UsernameForm> = async (data) => {
    const parseResult = updateUsernameSchema.safeParse(data);
    if (!parseResult.success) {
      setError("root", {
        type: "manual",
        message: parseResult.error.errors[0]?.message || "Invalid input",
      });
      return;
    }

    const newUser = await mutation.mutateAsync(data);
    overwrite(newUser);
    utils.user.findByUsername.invalidate();

    close({
      force: true,
    });
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="relative">
      <Modal key="setup-username" size={"sm"}>
        <h2 className="text-lg font-medium">Setup your username</h2>
        <p className="mt-2 text-light-600">
          Your username is how people recognize you on the platform.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {mutation.isError && (
            <Error size="sm" className="mb-2">
              {mutation.error?.message}
            </Error>
          )}

          <div className="flex items-start gap-2">
            <InputWrapper error={errors.username} className="flex-grow">
              <Input
                disabled={mutation.isPending}
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 32,
                    message: "Username must be at most 32 characters",
                  },
                  pattern: {
                    value: USERNAME_REGEX,
                    message:
                      "Username must only contain letters, numbers, and underscores",
                  },
                })}
              />
            </InputWrapper>

            <Button
              disabled={!!errors.username || mutation.isPending}
              className="flex-shrink-0"
              size="icon"
            >
              {mutation.isPending ? (
                <Spinner weight="thin" variant="light" size="sm" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        {errors.root && (
          <p className="mt-3 rounded-lg border border-red-500 bg-red-950/40 p-3 text-sm text-red-500">
            {errors.root.message}
          </p>
        )}
      </Modal>

      <div className="absolute inset-x-0 -bottom-10 w-full text-center">
        <button
          onClick={handleLogout}
          className="mt-4 w-full text-sm text-light-700 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
