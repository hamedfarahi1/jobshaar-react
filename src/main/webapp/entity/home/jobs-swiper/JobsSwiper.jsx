import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { useJobsSwiperStyles } from './styles';
import { Grid } from '@material-ui/core';
import './styles.scss'
function JobsSwiper() {
	const classes = useJobsSwiperStyles()

	const params = {
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		spaceBetween: 30,
		loop: true,
		autoplay: {
			delay: 4000
		},
	}
	return (
		<Grid container spacing={2} className={classes.grid}>
			<Swiper slideClass={classes.item} {...params}>
				<Grid item>
					<img alt='1' className='slider-img' src={require('../../../assest/images/slider-imgs/1.png')} />
				</Grid>
				<Grid item>
					<img alt='2' className='slider-img' src={require('../../../assest/images/slider-imgs/2.png')} />
				</Grid>
				<Grid item>
					<img alt='3' className='slider-img' src={require('../../../assest/images/slider-imgs/3.png')} />
				</Grid>
			</Swiper>
		</Grid>
	)
}

export { JobsSwiper }