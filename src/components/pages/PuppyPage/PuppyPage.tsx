import { useSelector } from 'react-redux'
import { puppyAsync, puppySelector } from '../../../store/slices/PuppySlices/puppySlice'
import { useEffect, } from 'react'
import { useAppDispatch } from '../../../store/store'
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, SpeedDialAction, Stack, Typography } from '@mui/material'
import { apiImageUrl } from '../../../Constants/Constants'
import Dialogs from '../../layout/dialog/Dialogs'
import UpdatedPuppyPage from '../UpdatedPupyPage/UpdatedPupyPage'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SpeedDial from '@mui/material/SpeedDial';


type Props = {}


export default function PuppyPage({ }: Props) {
    const puppyReducer = useSelector(puppySelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(puppyAsync())
    }, []);

    return (
        <>
            <Box className='container mx-auto grid grid-cols-4 gap-5 mt-5'>
                {(puppyReducer.result).map((itmes) => (
                    <>
                        <Card sx={{ maxWidth: 345 }} >

                            <Box
                                sx={{ height: 43, transform: 'translateZ(0px)', flexGrow: 1 }}
                            >
                                <SpeedDial
                                    ariaLabel="SpeedDial openIcon example"
                                    sx={{ position: 'absolute', width: 5, left: 25, top: -8, }}
                                    direction={'right'}
                                    icon={
                                        <IconButton>
                                            <MoreHorizIcon />
                                        </IconButton>
                                    }
                                >
                                    {[
                                        {
                                            icon:
                                                <IconButton>
                                                    <Dialogs
                                                        id={itmes.id}
                                                        name={itmes.puppyName}
                                                        breed={itmes.breed}
                                                        image={itmes.imageUrl}
                                                    />
                                                </IconButton>
                                            ,
                                            name: 'Delete'
                                        },
                                        {
                                            icon:
                                                <IconButton>
                                                    <UpdatedPuppyPage
                                                        id={itmes.id}
                                                        name={itmes.puppyName}
                                                        breed={itmes.breed}
                                                        image={itmes.imageUrl}
                                                    />
                                                </IconButton>
                                            , name: 'Update'
                                        },
                                    ].map((action) => (
                                        <SpeedDialAction
                                            key={action.name}
                                            icon={action.icon}
                                            tooltipTitle={action.name}
                                        />
                                    ))}
                                </SpeedDial>
                            </Box >
                            <CardActionArea key={itmes.id}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${apiImageUrl}${itmes.imageUrl}`}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {itmes.puppyName}
                                    </Typography>
                                    <Stack direction='row' className='flex justify-between'>
                                        <Typography variant="body2" color="text.secondary">
                                            {itmes.breed}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card >
                    </>
                ))}
            </Box >
        </>
    )
}