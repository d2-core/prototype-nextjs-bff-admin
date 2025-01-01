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
  memuArr: { id: string; name: string }[]
  dfValue?: string
  register: UseFormRegisterReturn
}
function SelectMenu({ title, memuArr, dfValue, register, sx, ...rest }: Props) {
  return (
    <Box sx={sx} {...rest}>
      <FormControl fullWidth>
        <InputLabel id={title}>{title}</InputLabel>
        <Select labelId={title} id={title} defaultValue={dfValue} {...register}>
          {memuArr.map((menu) => (
            <MenuItem key={menu.id} value={menu.id}>
              {menu.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectMenu
