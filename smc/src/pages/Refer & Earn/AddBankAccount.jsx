import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import { API } from "../../Host";
import axios from "axios";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  bank_name: yup.string().required("Bank Name is required"),
  branch: yup.string().required("Branch Name is required"),
  acc: yup.string().required("Account Number is required"),
  ifsc: yup.string().required("IFSC Code is required"),
  accname: yup.string().required("Account Holder is required"),
});

const InfoRow = ({
  label,
  placeholder,
  type = "text",
  register,
  errors,
  name,
  required = false,
}) => (
  <div className="grid lg:grid-cols-12 md:grid-cols-12 items-center lg:gap-5 md:gap-5 gap-3 pb-3.5 mx-5 ">
    <span className="col-span-5 text-sm font-semibold">
      {label}
      {required && <span className="text-red-500">*</span>}
    </span>
    <div className="col-span-7">
      <input
        type={type}
        required={required}
        {...register(name)}
        placeholder={placeholder}
        className="w-full text-white text-sm font-light border border-gray-500 rounded-md h-11 px-2 placeholder:text-gray-400 placeholder:text-xs"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
      )}
    </div>
  </div>
);

const AddBankAccount = ({ onclose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("user");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const formdata = {
      userId: userId,
      bankDetails: {
        acc: data.acc,
        accname: data.accname,
        ifsc: data.ifsc,
        bank_name: data.bank_name,
        branch: data.branch,
      },
    };

    try {
      const response = await axios.post(`${API}/api/bankdetails`, formdata);
      toast.success("Bank Account Added Successfully");
    } catch (error) {
      toast.error("Account Number already Exists");
      console.error("Failed to submit bank details:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        onclose();
      }, 1500);
    }
  };

  return (
    <div className="font-roboto-flex fixed inset-0 grid justify-center items-center backdrop-blur-xs drop-shadow-md">
      <div className="mx-2 shadow-lg p-2 bg-popup-gray text-white lg:w-[500px] md:w-[500px] w-96 rounded-lg">
        <div className="grid">
          <button
            onClick={onclose}
            className="place-self-end bg-popup-gray rounded-full -mx-2 -my-3 shadow-none"
          >
            <IoClose className="size-[24px]" />
          </button>
          <h1 className="text-center font-bold text-xl py-2">
            Add Bank Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="py-6">
            <InfoRow
              label="Bank Name"
              name="bank_name"
              placeholder="Enter Bank name"
              register={register}
              errors={errors}
              required
            />
            <InfoRow
              label="Branch Name"
              name="branch"
              placeholder="Enter Branch name"
              register={register}
              errors={errors}
              required
            />
            <InfoRow
              label="Account Number"
              name="acc"
              placeholder="Enter Account number"
              register={register}
              errors={errors}
              required
            />
            <InfoRow
              label="IFSC Code"
              name="ifsc"
              placeholder="Enter IFSC code"
              register={register}
              errors={errors}
              required
            />
            <InfoRow
              label="Account Holder"
              name="accname"
              placeholder="Enter Account holder"
              register={register}
              errors={errors}
              required
            />

            <div className="mx-5 pt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onclose}
                className="cursor-pointer text-sidebar border-sidebar border px-6 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`cursor-pointer px-6 py-2 rounded ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                    : "bg-teal-400 text-black"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBankAccount;
