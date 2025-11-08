import React from 'react'
import { Box, Typography, Container } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

export interface BannerTheme {
	backgroundColor?: string
	textColor?: string
	accentColor?: string
	fontSize?: string | number
	fontWeight?: string | number
	padding?: string | number
}

export interface BannerProps {
	title: string
	subtitle?: string
	theme?: BannerTheme
	className?: string
}

const useStyles = makeStyles<Theme, BannerTheme>((theme) => ({
	root: {
		backgroundColor: (props) => props.backgroundColor || theme.palette.primary.main,
		color: (props) => props.textColor || theme.palette.primary.contrastText,
		padding: (props) => props.padding || theme.spacing(4, 0),
		textAlign: 'center' as const,
	},
	title: {
		fontSize: (props) => props.fontSize || '2.5rem',
		fontWeight: (props) => (props.fontWeight as any) || 700,
		marginBottom: theme.spacing(2),
	},
	subtitle: {
		fontSize: '1.2rem',
		opacity: 0.9,
	},
	accent: {
		borderBottom: (props) => `4px solid ${props.accentColor || theme.palette.secondary.main}`,
		display: 'inline-block' as const,
		paddingBottom: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
}))

function Banner({ title, subtitle, theme: customTheme = {}, className }: BannerProps) {
	const classes = useStyles(customTheme)

	return (
		<Box className={`${classes.root} ${className || ''}`}>
			<Container maxWidth="lg">
				<Typography variant="h1" component="h1" className={classes.title}>
					<span>Banner</span>
					<span className={classes.accent}>{title}</span>
				</Typography>
				{subtitle && (
					<Typography variant="h5" component="p" className={classes.subtitle}>
						{subtitle}
					</Typography>
				)}
			</Container>
		</Box>
	)
}

export default Banner

