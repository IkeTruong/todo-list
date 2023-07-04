import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

export const NormalizeButton = styled(Button)(({ hasGradient = true }) => ({
  textTransform: 'capitalize',
  background: hasGradient
    ? 'linear-gradient(to top, #56ccf2, #2f80ed)'
    : undefined,
}))
