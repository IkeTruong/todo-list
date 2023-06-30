import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@mui/material/Typography'

const TypoAdvanced = ({
  variant,
  isLink,
  bold,
  uppercase,
  line,
  color,
  noWrap,
  gutterBottom,
  paragraph,
  component,
  align,
  sx,
  ...restProps
}) => {
  const invalidColor = [
    'initial',
    'inherit',
    'default',
    'textSecondary',
    'textPrimary',
    '',
  ].includes(color)

  return (
    <Typography
      variant={variant}
      noWrap={noWrap}
      gutterBottom={gutterBottom}
      align={align}
      paragraph={paragraph}
      component={component}
      color={color}
      sx={(theme) => ({
        ...{
          fontWeight: bold ? theme.typography.fontWeightBold : undefined,
          textTransform: uppercase ? 'uppercase' : undefined,
          color: invalidColor ? undefined : theme.palette[color]?.main,
          '&:hover': {
            textDecoration: isLink ? 'underline' : undefined,
            cursor: isLink ? 'pointer' : undefined,
          },
        },
        ...(line
          ? {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: line || undefined,
            }
          : {}),
        ...sx,
      })}
      {...restProps}
    />
  )
}

export default TypoAdvanced

TypoAdvanced.propTypes = {
  variant: PropTypes.string,
  isLink: PropTypes.bool,
  bold: PropTypes.bool,
  uppercase: PropTypes.bool,
  noWrap: PropTypes.bool,
  gutterBottom: PropTypes.bool,
  align: PropTypes.string,
  paragraph: PropTypes.bool,
  line: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  component: PropTypes.elementType,
  sx: PropTypes.any,
}
