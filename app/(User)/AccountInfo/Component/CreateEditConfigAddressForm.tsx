import { useForm } from "react-hook-form";
import AddressShowEditModel from "@/app/(User)/accountInfo/Component/AddressShowEditModel";
import { useEffect } from "react";

import { UserAddressListType } from "@/Type/UserDetailType";
import { UsePanel } from "@/context/Context";

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
  EditAddersData,
}: {
  typeOperation: "Create" | "Edit";
  onClose: () => void;
  EditAddersData?: UserAddressListType;
}) {
  const { userDataContext } = UsePanel();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,

    formState: { errors, isSubmitting, isDirty },
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
    if (typeOperation === "Edit" && EditAddersData) {
      reset({
        email: EditAddersData.email,
        contactNumber: EditAddersData.contactNumber,
        country: EditAddersData?.country,
        addressLine1: EditAddersData.addressLine1,
        addressLine2: EditAddersData.addressLine2,
        city: EditAddersData.city,
        state: EditAddersData.state,
        countryCode: EditAddersData?.countryCode,
        pinCode: EditAddersData?.pinCode,
      });
    }

    if (typeOperation === "Create") {
      reset({
        country: "",
        state: "",
        countryCode: "",
        pinCode: "",
        contactNumber: userDataContext.info?.contactNumber,
        email: userDataContext.info?.email,
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
        isDirty={isDirty}
        EditAddressId={EditAddersData?.id}
      />
    </>
  );
}
