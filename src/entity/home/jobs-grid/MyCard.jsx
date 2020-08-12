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
import { useCardStyles } from '../styles';
import { Link } from 'react-router-dom';


function MyCard(props) {

	const cardClasses = useCardStyles();
	const item = props.item;

	const onMoreOption = (e) => {
		e.preventDefault();
	}
	return (
		<Card  className={cardClasses.root}>
			<Link to={"/job/" + item.id}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" src={item.company.logoDataUrl ? item.company.logoDataUrl : require(`../../../assest/images/18.png`)} />
					}
					action={
						<IconButton onClick={onMoreOption} aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={<Typography style={{ fontSize: 'small' }}>{item.title}</Typography>}
					subheader={item.company.name}
				/>
				<CardMedia
					classes={{
						root: cardClasses.media
					}}
					image={item.company.logoDataUrl ? item.company.logoDataUrl : require(`../../../assest/images/18.png`)}
					title="Paella dish"
				/>
			</Link>
			<CardContent>
				<Typography id="container-card" style={{ maxHeight: '20px', overflow: 'hidden' }} variant="body2" color="textSecondary" component="p">
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