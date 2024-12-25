import {
  Box,
  BoxProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends BoxProps {
  title: string
  memuMap: Record<string, string>
  dfValue?: string
  register: UseFormRegisterReturn
}
function SelectMenu({ title, memuMap, dfValue, register, sx, ...rest }: Props) {
  return (
    <Box sx={sx} {...rest}>
      <FormControl fullWidth>
        <InputLabel id={title}>{title}</InputLabel>
        <Select labelId={title} id={title} defaultValue={dfValue} {...register}>
          {Object.entries(memuMap).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectMenu
