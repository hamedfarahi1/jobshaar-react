import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useCardStyles } from './styles';

function MyCard(props) {

	const cardClasses = useCardStyles();
	const item = props.item;
	return (
		<Card className={cardClasses.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" src={require('../../assest/images/' + item.company.id + '.png')} />
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={<Typography style={{ fontSize: 'small' }}>{item.title}</Typography>}
				subheader={item.company.name}
			/>
			<CardMedia
				className={cardClasses.media}
				image={require('../../assest/images/' + item.company.id + '.png')}
				title="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{item.company.bio}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>

		</Card>
	);
}

export { MyCard }