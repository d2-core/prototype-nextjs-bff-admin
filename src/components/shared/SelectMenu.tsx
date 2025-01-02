import {
  Box,
  BoxProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends BoxProps {
  title?: string
  memuArr: { id: string; name: string }[]
  value?: string
  register?: UseFormRegisterReturn
  onSelectChange?: (e: SelectChangeEvent<string>, id: string) => void
}
function SelectMenu({
  title,
  memuArr,
  register,
  value,
  onSelectChange,
  sx,
  ...rest
}: Props) {
  return (
    <Box sx={sx} {...rest}>
      <FormControl fullWidth>
        {title && <InputLabel id={title}>{title}</InputLabel>}
        <Select
          labelId={title}
          id={title}
          value={value}
          onChange={(e) => onSelectChange && onSelectChange(e, e.target.value)}
          {...register}
        >
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
