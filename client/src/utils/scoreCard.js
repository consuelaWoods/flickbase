import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

const ScoreCard = ({current}) => {

    return (
        <>
            <hr/>
            <List className='scorecard'>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar><StarIcon/></Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                        primary="Our score" 
                        secondary={current.score} 
                        className="rating"
                    />
                </ListItem>
                <Divider variant='inset' component="li"/>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar><PersonIcon/></Avatar>
                    </ListItemAvatar>
                    <div>
                        {current.actors.map( (actor, index) => (
                            <Chip
                                key={`${actor+index}`}
                                item={actor}
                                label={actor}
                                clickable
                                color="primary"
                                className='chip'
                            />
                        ))}
                    </div>
                </ListItem>
                <Divider variant='inset' component="li"/>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar><MovieIcon/></Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                            primary="Director" 
                            secondary={current.director} 
                    />
                </ListItem>
            </List>
        </>
    )
}
export default ScoreCard;