import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export const TitleTypography = styled(Typography)(({ theme }) => ({
  WebkitBackgroundClip: 'text',
  backgroundImage:
    'linear-gradient(to right, #09f1b8, #00a2ff, #ff00d2, #fed90f)',
  letterSpacing: 'calc(1em / 8)',
  color: theme.palette.common.white,
  fontWeight: 700,
  padding: 'calc(calc(1em / 16) / 2)',
  WebkitTextStrokeColor: 'transparent',
  WebkitTextStrokeWidth: 'calc(1em / 16)',
}))
