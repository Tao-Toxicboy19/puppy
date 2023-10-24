import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../../../store/store';
import { deletePuppyAsync } from '../../../store/slices/PuppySlices/deletePupySlice';
import { apiImageUrl } from '../../../Constants/Constants';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    id: number
    name: string
    breed: string
    image: string
}

export default function Dialogs({ id, name, breed, image }: Props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton>
                <DeleteIcon onClick={handleClickOpen} />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>{name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {breed}
                        <img src={`${apiImageUrl}${image}`} alt="puppy" className='h-[60%]' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={() => dispatch(deletePuppyAsync(id))}>
                        <DeleteIcon />
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}