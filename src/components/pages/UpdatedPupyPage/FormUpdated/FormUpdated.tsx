import { Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../store/store";
import { updatedPuppyAsync } from "../../../../store/slices/PuppySlices/updatePuppySlice";


type Props = {
    id: number
    name: string
    breed: string
    handleClose: () => void
}

export default function FormUpdated({ id, name, breed, handleClose }: Props) {
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit((data) => {
            const formData = new FormData();
            formData.append("puppyName", data.puppyName);
            formData.append("breed", data.breed);
            formData.append("file", data.imageUrl[0]);
            console.log(data)
            dispatch(updatedPuppyAsync({ id, formData, handleClose }))
            // const token = localStorage.getItem("token");
            // const config = {
            //     headers: {
            //         authorization: token
            //     }
            // };
            // axios.put(`http://localhost:30/api/puppy/${id}`, formData, config)
            //     .then(res => console.log(res))
            //     .catch(errors => console.log(errors))
        })}>
            <Stack direction='column' spacing={2}>
                <Stack direction='column' spacing={2}>
                    <TextField
                        id="puppyName"
                        label="Puppy Name"
                        variant="standard"
                        {...register("puppyName", { required: true })}
                        defaultValue={name}
                    />
                    {errors.puppyName && <p>Puppy name is required.</p>}

                    <TextField
                        id="Breed"
                        label="Breed"
                        variant="standard"
                        {...register("breed", { required: true })}
                        defaultValue={breed}
                    />
                    {errors.breed && <p>Breed is required.</p>}

                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            {...register("imageUrl", { required: true })}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600"
                        />
                    </label>
                    {errors.imageUrl && <p>Image is required.</p>}
                </Stack>
                <Stack direction='row' spacing={2} className="justify-between">
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                    >
                        close
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}
