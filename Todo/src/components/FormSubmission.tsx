import type {
  ChangeEvent,
  FormEvent,
  RefObject,
} from "react";

type FormData = {
    title:string;
    handleAdd:(e:FormEvent<HTMLFormElement>)=>void;
    handleChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    ref:RefObject<HTMLInputElement | null>;
}

const FormSubmission = ({handleAdd,handleChange,title,ref}:FormData) => {
  return (
    <>
    <form onSubmit={handleAdd}>
        <input
          type="text"
          onChange={handleChange}
          value={title}
          className="shadow-2xs p-2 focus:outline-none"
          ref={ref}
        />
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-xs ml-4 cursor-pointer active:translate-y-1 "
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default FormSubmission