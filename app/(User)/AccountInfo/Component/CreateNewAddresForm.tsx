import { useForm } from "react-hook-form";
import CountryStateField from "@/app/(User)/accountInfo/Component/AddressShowEditModel";

export default function CreateAddressForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "",
      state: "",
      countryCode: "",
      pinCode: "",
    },
  });

  return (
    <form>
      <CountryStateField
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
    </form>
  );
}
