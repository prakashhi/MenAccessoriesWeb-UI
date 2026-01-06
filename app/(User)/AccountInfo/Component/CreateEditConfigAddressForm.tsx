import { useForm } from "react-hook-form";
import AddressShowEditModel from "@/app/(User)/accountInfo/Component/AddressShowEditModel";
import { useEffect } from "react";

import { UserGetDetailType } from "@/Type/UserDetailType";

export type FormValueAddressCreate = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  countryCode: string;
  contactNumber: string;
  email: string;
};

export default function CreateEditConfigAddressForm({
  typeOperation,
  onClose,
  userData,
}: {
  typeOperation: "Create" | "Edit";
  onClose: () => void;
  userData: UserGetDetailType ;
}) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValueAddressCreate>({
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      countryCode: "",
      contactNumber: "",
      email: "",
    },
  });

  useEffect(() => {
    // if (typeOperation === "Edit" && editAddressData) {
    //   reset({
    //     country: editAddressData.country,
    //     state: editAddressData.state,
    //     countryCode: editAddressData.countryCode,
    //     pinCode: editAddressData.pinCode,
    //   });
    // }

    if (typeOperation === "Create") {
      reset({
        country: "",
        state: "",
        countryCode: "",
        pinCode: "",
        contactNumber: userData.contactNumber,
        email: userData.email,
      });
    }
  }, [typeOperation, reset]);

  return (
    <>
      <AddressShowEditModel
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        onClose={onClose}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        typeOperation={typeOperation}
      />
    </>
  );
}
