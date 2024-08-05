import { useModal } from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { Error } from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/ui/input-wrapper";
import { Modal } from "@/components/ui/modal";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type CreateProjectInput = {
  name: string;
  description: string;
};

interface Props {}

export const ProjectCreateModal = ({}: Props) => {
  const modal = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectInput>();
  const router = useRouter();

  const mutation = api.project.create.useMutation();
  const utils = api.useUtils();

  const onSubmit: SubmitHandler<CreateProjectInput> = async (data) => {
    modal.lock();

    try {
      const project = await mutation.mutateAsync(data);
      utils.project.invalidate();
      router.push(`/dashboard/${project.id}`);

      modal.close({
        force: true,
      });
      
    } catch (error) {
      modal.unlock();
    }
  };

  return (
    <Modal size="sm" key="project-create">
      <h4 className="text-lg font-medium">Create a project</h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-3"
      >
        {mutation.isError && <Error size="sm">{mutation.error.message}</Error>}

        <InputWrapper error={errors.name}>
          <Input
            disabled={mutation.isPending}
            type="text"
            autoComplete="off"
            placeholder="Name"
            {...register("name", {
              required: "is required",
              maxLength: { value: 50, message: "Max length is 50" },
              minLength: { value: 3, message: "Min length is 5" },
            })}
          />
        </InputWrapper>

        <InputWrapper error={errors.description}>
          <Input
            disabled={mutation.isPending}
            type="text"
            autoComplete="off"
            placeholder="description (optional)"
            {...register("description", {
              maxLength: { value: 200, message: "Max length is 200" },
            })}
          />
        </InputWrapper>
        <Button
          disabled={mutation.isPending}
          type="submit"
          className="justify-center"
        >
          {!mutation.isPending ? "Create" : "Creating"}
        </Button>
      </form>
    </Modal>
  );
};
