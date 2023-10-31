import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AddCircle } from '@mui/icons-material';
import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../store/store';
import { createPuppyAsync } from '../../../store/slices/PuppySlices/createPuppySlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type Props = {
    handleClickOpen: () => void
    handleClose: () => void
    open: boolean
}

export default function CreatePuppyPage({ handleClickOpen, handleClose, open }: Props) {
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <AddCircle onClick={handleClickOpen} />
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth='sm'
                fullWidth
            >
                <form encType="multipart/form-data" onSubmit={handleSubmit((data) => {
                    const formData = new FormData();
                    formData.append("puppyName", data.puppyName);
                    formData.append("breed", data.breed);
                    formData.append("file", data.imageUrl[0]);
                    dispatch(createPuppyAsync(formData))
                })}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Puppy
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>

                        <Stack direction='column' spacing={2}>
                            <TextField
                                id="puppyName"
                                label="puppyName"
                                variant="standard"
                                {...register("puppyName", { required: true })}
                            />
                            {errors.puppyName && <p>Puppy name is required.</p>}

                            <TextField
                                id="Breed"
                                label="Breed"
                                variant="standard"
                                {...register("breed", { required: true })}
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
                                hover:file:bg-blue-600
                                "
                                />
                            </label>
                            {errors.image && <p>Image is required.</p>}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" onClick={handleClose}>
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div >
    );
}